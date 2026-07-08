import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { deliverToHubSpot } from './hubspot'

const DATA_FILE = path.join(process.cwd(), 'data', 'contact-submissions.json')

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  await fs.mkdir(dir, { recursive: true })
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, '[]', 'utf-8')
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const formType = body.formType || 'general'
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    const submittedAt = new Date().toISOString()

    let submission

    if (formType === 'agency-intake') {
      const required = ['name', 'email', 'who', 'project', 'size', 'budget']
      const missing = required.filter((k) => !body[k] || !String(body[k]).trim())
      if (missing.length) {
        return NextResponse.json(
          { error: `Missing required fields: ${missing.join(', ')}.` },
          { status: 400 }
        )
      }
      submission = {
        id,
        formType,
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        who: body.who,
        project: body.project,
        size: body.size,
        budget: body.budget,
        url: body.url || '',
        telegram: body.telegram || '',
        timeline: body.timeline || '',
        source: body.source || '',
        submittedAt,
      }
    } else if (formType === 'creator-network-brand') {
      const required = ['name', 'company', 'email', 'goal', 'budget', 'timeline']
      const missing = required.filter((k) => !body[k] || !String(body[k]).trim())
      if (missing.length) {
        return NextResponse.json(
          { error: `Missing required fields: ${missing.join(', ')}.` },
          { status: 400 }
        )
      }
      submission = {
        id,
        formType,
        lead: 'brand',
        name: body.name,
        company: body.company,
        role: body.role || '',
        email: body.email,
        goal: body.goal,
        budget: body.budget,
        timeline: body.timeline,
        markets: body.markets || '',
        submittedAt,
      }
    } else if (formType === 'creator-network-creator') {
      const required = ['name', 'creatorName', 'primaryPlatform', 'category', 'location', 'email']
      const missing = required.filter((k) => !body[k] || !String(body[k]).trim())
      if (missing.length) {
        return NextResponse.json(
          { error: `Missing required fields: ${missing.join(', ')}.` },
          { status: 400 }
        )
      }
      submission = {
        id,
        formType,
        lead: 'creator',
        status: 'Onboarding',
        source: 'Application',
        name: body.name,
        creatorName: body.creatorName,
        primaryPlatform: body.primaryPlatform,
        allPlatforms: body.allPlatforms || '',
        category: body.category,
        location: body.location,
        audience: body.audience || '',
        pastDeals: body.pastDeals || '',
        rate: body.rate || '',
        openness: body.openness || '',
        email: body.email,
        contactMethod: body.contactMethod || '',
        links: body.links || '',
        submittedAt,
      }
    } else if (formType === 'newsletter') {
      if (!body.email || !String(body.email).trim()) {
        return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
      }
      submission = {
        id,
        formType,
        email: body.email,
        source: body.source || 'unknown',
        submittedAt,
      }
    } else if (formType.startsWith('solution-')) {
      // solution-sales | solution-demo | solution-early-access — every lead
      // arrives pre-routed via the `solution` / `vertical` tags.
      if (!body.email || !String(body.email).trim()) {
        return NextResponse.json({ error: 'Email is required.' }, { status: 400 })
      }
      const track = formType.replace('solution-', '') // sales | demo | early-access
      submission = {
        id,
        formType,
        track,
        solution: body.solution || '',
        solutionName: body.solutionName || '',
        vertical: body.vertical || '',
        name: body.name || '',
        company: body.company || '',
        channel: body.channel || '',
        email: body.email,
        project: body.project || '',
        audience: body.audience || '',
        budget: body.budget || '',
        timeline: body.timeline || '',
        submittedAt,
      }
    } else {
      const { firstName, lastName, email, message } = body
      if (!firstName || !lastName || !email || !message) {
        return NextResponse.json(
          { error: 'First name, last name, email, and message are required.' },
          { status: 400 }
        )
      }
      submission = {
        id,
        formType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        company: body.company || '',
        interest: body.interest || '',
        message: body.message,
        source: body.source || 'unknown',
        submittedAt,
      }
    }

    // Deliver into HubSpot so Breeze AI + workflows can work the lead. No-op
    // (never throws) until HUBSPOT_ACCESS_TOKEN is configured.
    const delivery = await deliverToHubSpot(submission)

    // Best-effort local persistence. On serverless/read-only filesystems this
    // will fail — that must never break the request, so it's isolated in its
    // own try/catch. HubSpot is the source of truth once configured.
    try {
      await ensureDataFile()
      const raw = await fs.readFile(DATA_FILE, 'utf-8')
      const submissions = JSON.parse(raw)
      submissions.push(submission)
      await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8')
    } catch (fsErr) {
      console.warn('Local submission persistence skipped:', fsErr.message)
    }

    return NextResponse.json(
      { success: true, id: submission.id, delivered: delivery.delivered },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Failed to save submission.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    await ensureDataFile()
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    const submissions = JSON.parse(raw)
    return NextResponse.json({ submissions, count: submissions.length })
  } catch (error) {
    console.error('Contact read error:', error)
    return NextResponse.json(
      { error: 'Failed to read submissions.' },
      { status: 500 }
    )
  }
}
