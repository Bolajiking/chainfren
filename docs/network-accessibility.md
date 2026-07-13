# Network accessibility runbook

## Current canonical host

Use `https://www.chainfren.com` as the public canonical host. It is reachable
over HTTPS from the checked Vercel endpoints. The apex `chainfren.com` must
redirect to `www` only after it is independently reachable on port 443.

## Production DNS ownership and remediation

Vercel reports that the Chainfren domain is assigned to the `chainfren`
project, but its active nameservers are the third-party `dns-parking.com`
nameservers. Make DNS changes there unless intentionally migrating the whole
zone to Vercel.

1. In Vercel, open **chainfren → Settings → Domains** and select
   `chainfren.com`. Confirm it is assigned to the production deployment and
   set `www.chainfren.com` as the primary domain.
2. Click Vercel's domain refresh/check action and copy its currently required
   DNS values. Do not substitute values from an old guide.
3. At the active DNS provider, remove only conflicting apex `A`, `AAAA`, or
   `CNAME` records. Keep unrelated MX, TXT, and verification records.
4. Create exactly the apex record Vercel currently requests and the exact
   `www` CNAME Vercel currently requests. Do not publish a private address or
   an IPv6 record unless Vercel has explicitly supplied it.
5. Configure the apex-to-`www` redirect in Vercel after both hostnames show
   **Valid Configuration**. Avoid DNS-level forwarding that can create a
   redirect loop.
6. If the apex remains unreachable from any normal network after DNS has
   propagated, open a Vercel support case with the failed destination IP,
   timestamps, traceroute/MTR, and the Vercel request IDs. Do not disable HTTPS
   or firewall protections as a workaround.

The safer alternative is a full nameserver migration to Vercel, but only after
inventorying and recreating every needed non-web record (especially MX, SPF,
DKIM, DMARC, and verification TXT records).

## Verification commands

Run these from the affected network and an independent network after each DNS
change. Test both IPv4 and IPv6 where records exist.

```bash
dig +short A chainfren.com
dig +short AAAA chainfren.com
dig +short CNAME www.chainfren.com
curl -4 -sS -I --connect-timeout 10 https://chainfren.com
curl -4 -sS -I --connect-timeout 10 https://www.chainfren.com
curl -sS https://www.chainfren.com/api/health
```

Expected results: `chainfren.com` responds on HTTPS and redirects once to
`www`; `www` returns `200`; and `/api/health` returns a non-cached JSON object
with `status: "ok"`.

## Local and LAN development

Start the development server normally:

```bash
npm run dev
```

The checked Next.js version binds to all interfaces by default. Find the
current private Wi-Fi/hotspot address with `ifconfig` and open
`http://<private-ip>:3000` from another device on the same network. This is
for trusted local networks only; never port-forward or expose the development
server publicly.

If a second device cannot connect while the Mac can reach its private address,
check macOS's incoming-connections prompt/firewall and Wi-Fi client isolation
on the router. Test a mobile hotspot separately to distinguish router policy
from application behavior.

## Operational monitoring

Probe `/api/health` from at least two regions and alert on connection failures
or five consecutive non-2xx responses. Keep this basic endpoint independent
of Contentful, HubSpot, weather, and other third parties: their temporary
failure must not report the website itself as down.
