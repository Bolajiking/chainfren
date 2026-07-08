// ─────────────────────────────────────────────────────────────────────────
// HubSpot CRM delivery.
//
// Every inbound submission is upserted as a Contact and gets a Note attached
// with the full, formatted payload. That gives HubSpot's Breeze AI agents and
// workflows the raw context they need to classify + route, score + enrich, and
// draft a reply — the three jobs the lead pipeline is configured to do inside
// HubSpot (a human reviews drafts before sending; no auto-response here).
//
// Env-gated: with no HUBSPOT_ACCESS_TOKEN this is a no-op that never throws, so
// local dev and preview deploys keep working before the integration is live.
// Uses the plain REST API (no SDK dependency).
// ─────────────────────────────────────────────────────────────────────────

const BASE = 'https://api.hubapi.com'

// Note → Contact default association (HubSpot-defined typeId).
const NOTE_TO_CONTACT = 202

// Custom contact property that tags each lead by formType so HubSpot routing
// rules / Breeze can branch on one clean enum field. Auto-provisioned on first
// use (needs the crm.schemas.contacts.write scope). If provisioning fails, we
// simply omit the tag rather than break the contact upsert.
const LEAD_TYPE_PROP = 'chainfren_lead_type'
const LEAD_TYPES = [
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'agency', label: 'Agency' },
  { value: 'creator_network_brand', label: 'Creator Network — Brand' },
  { value: 'creator_network_creator', label: 'Creator Network — Creator' },
  { value: 'solution_sales', label: 'Solution — Sales' },
  { value: 'solution_demo', label: 'Solution — Demo' },
  { value: 'solution_early_access', label: 'Solution — Early Access' },
  { value: 'contact', label: 'Contact' },
]

function leadTypeValue(formType) {
  switch (formType) {
    case 'newsletter':
      return 'newsletter'
    case 'agency-intake':
      return 'agency'
    case 'creator-network-brand':
      return 'creator_network_brand'
    case 'creator-network-creator':
      return 'creator_network_creator'
    case 'solution-sales':
      return 'solution_sales'
    case 'solution-demo':
      return 'solution_demo'
    case 'solution-early-access':
      return 'solution_early_access'
    default:
      return 'contact'
  }
}

// Full submission is mirrored onto this multi-line text property so every lead
// carries its context on the contact record itself — no Notes scope required
// (Service Keys don't offer crm.objects.notes.write). Notes, when the scope is
// present, still add a nicer timeline entry as a bonus.
const SUBMISSIONS_PROP = 'chainfren_submissions'

// Cached across warm invocations: null = unknown, true/false = resolved.
let leadTypeReady = null
let submissionsReady = null
// null = untried, false = scope absent (stop attempting notes).
let noteSupported = null

// Generic "create the contact property if it's missing" helper. Returns whether
// the property is available to write to. Needs crm.schemas.contacts.write.
async function ensureProperty(token, definition) {
  try {
    const get = await hs(`/crm/v3/properties/contacts/${definition.name}`, 'GET', null, token)
    if (get.ok) return true
    if (get.status === 404) {
      const create = await hs('/crm/v3/properties/contacts', 'POST', definition, token)
      // 409 = created concurrently / already exists — also fine.
      if (create.ok || create.status === 409) return true
      console.error('HubSpot property create failed:', definition.name, create.status, await create.text())
      return false
    }
    return false
  } catch (e) {
    console.error('HubSpot property ensure failed:', definition.name, e.message)
    return false
  }
}

async function ensureLeadTypeProperty(token) {
  if (leadTypeReady !== null) return leadTypeReady
  leadTypeReady = await ensureProperty(token, {
    name: LEAD_TYPE_PROP,
    label: 'Chainfren Lead Type',
    type: 'enumeration',
    fieldType: 'select',
    groupName: 'contactinformation',
    options: LEAD_TYPES.map((t, i) => ({ label: t.label, value: t.value, displayOrder: i })),
  })
  return leadTypeReady
}

async function ensureSubmissionsProperty(token) {
  if (submissionsReady !== null) return submissionsReady
  submissionsReady = await ensureProperty(token, {
    name: SUBMISSIONS_PROP,
    label: 'Chainfren Submission',
    type: 'string',
    fieldType: 'textarea',
    groupName: 'contactinformation',
  })
  return submissionsReady
}

// Plain-text version of the payload for the contact property.
function summaryText(sub) {
  const type = TYPE_LABELS[sub.formType] || sub.formType || 'Submission'
  const lines = [`New ${type}`]
  if (sub.submittedAt) lines.push(`Submitted: ${sub.submittedAt}`)
  lines.push('—')
  for (const [k, v] of Object.entries(sub)) {
    if (['id', 'formType', 'submittedAt'].includes(k)) continue
    if (v === undefined || v === null || v === '') continue
    lines.push(`${labelize(k)}: ${v}`)
  }
  return lines.join('\n')
}

const TYPE_LABELS = {
  'agency-intake': 'Agency intake',
  'creator-network-brand': 'Creator Network — Brand',
  'creator-network-creator': 'Creator Network — Creator application',
  newsletter: 'Newsletter signup',
  'solution-sales': 'Solution — Sales enquiry',
  'solution-demo': 'Solution — Demo request',
  'solution-early-access': 'Solution — Early access',
  general: 'Contact form',
}

function splitName(sub) {
  let first = sub.firstName || ''
  let last = sub.lastName || ''
  if (!first && !last && sub.name) {
    const parts = String(sub.name).trim().split(/\s+/)
    first = parts.shift() || ''
    last = parts.join(' ')
  }
  return { first, last }
}

function labelize(k) {
  return k
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase())
    .trim()
}

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

function noteBody(sub) {
  const type = TYPE_LABELS[sub.formType] || sub.formType || 'Submission'
  const lines = [`<strong>New ${escapeHtml(type)}</strong>`]
  if (sub.submittedAt) lines.push(`Submitted: ${escapeHtml(sub.submittedAt)}`)
  lines.push('<hr/>')
  for (const [k, v] of Object.entries(sub)) {
    if (['id', 'formType', 'submittedAt'].includes(k)) continue
    if (v === undefined || v === null || v === '') continue
    lines.push(`<strong>${escapeHtml(labelize(k))}:</strong> ${escapeHtml(v)}`)
  }
  return lines.join('<br/>')
}

async function hs(pathname, method, body, token) {
  return fetch(BASE + pathname, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  })
}

async function upsertContact(sub, token) {
  const { first, last } = splitName(sub)
  const [tagged, logged] = await Promise.all([
    ensureLeadTypeProperty(token),
    ensureSubmissionsProperty(token),
  ])
  const props = {
    email: sub.email,
    ...(tagged ? { [LEAD_TYPE_PROP]: leadTypeValue(sub.formType) } : {}),
    ...(logged ? { [SUBMISSIONS_PROP]: summaryText(sub) } : {}),
    ...(first ? { firstname: first } : {}),
    ...(last ? { lastname: last } : {}),
    ...(sub.phone ? { phone: sub.phone } : {}),
    ...(sub.company || sub.creatorName
      ? { company: sub.company || sub.creatorName }
      : {}),
    ...(sub.role ? { jobtitle: sub.role } : {}),
    ...(sub.url || sub.website || sub.links
      ? { website: sub.url || sub.website || sub.links }
      : {}),
    hs_lead_status: 'NEW',
    lifecyclestage: sub.formType === 'newsletter' ? 'subscriber' : 'lead',
  }

  // Create, then fall back to update-by-email if the contact already exists.
  let res = await hs('/crm/v3/objects/contacts', 'POST', { properties: props }, token)
  if (res.status === 409) {
    res = await hs(
      `/crm/v3/objects/contacts/${encodeURIComponent(sub.email)}?idProperty=email`,
      'PATCH',
      { properties: props },
      token
    )
  }
  if (!res.ok) {
    throw new Error(`contact upsert ${res.status}: ${await res.text()}`)
  }
  const data = await res.json()
  return data.id
}

async function attachNote(contactId, sub, token) {
  const res = await hs(
    '/crm/v3/objects/notes',
    'POST',
    {
      properties: {
        hs_timestamp: Date.now().toString(),
        hs_note_body: noteBody(sub),
      },
      associations: [
        {
          to: { id: contactId },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: NOTE_TO_CONTACT,
            },
          ],
        },
      ],
    },
    token
  )
  if (!res.ok) throw new Error(`note ${res.status}: ${await res.text()}`)
}

// Never throws. Returns a small status object for logging.
export async function deliverToHubSpot(sub) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN
  if (!token) return { delivered: false, reason: 'no-token' }
  if (!sub?.email) return { delivered: false, reason: 'no-email' }
  try {
    const contactId = await upsertContact(sub, token)
    // Note is a bonus timeline entry. The full payload already lives on the
    // contact's chainfren_submissions property, so if the Notes scope is
    // absent (Service Keys) we simply stop trying after the first 403.
    if (noteSupported !== false) {
      try {
        await attachNote(contactId, sub, token)
        noteSupported = true
      } catch (e) {
        if (/\b403\b/.test(e.message)) noteSupported = false
        console.error('HubSpot note skipped:', e.message)
      }
    }
    return { delivered: true, contactId }
  } catch (e) {
    console.error('HubSpot delivery failed:', e.message)
    return { delivered: false, reason: 'error' }
  }
}
