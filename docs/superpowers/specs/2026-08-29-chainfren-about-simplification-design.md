# Chainfren About page simplification

Date: 2026-08-29

## Purpose

The About page should give a new visitor a clear overview of Chainfren without repeating the full company thesis. It should explain the company, its argument, what it builds, and how someone can work with it.

The page must remain useful to users, partners, investors, and potential hires. It must read as a public company page, not an internal operating document.

## Page structure

The page will contain four sections.

### 1. Intro

Keep the current headline:

> African creators have already won the attention. The next fight is ownership.

Keep the About Chainfren eyebrow and the short company facts. Tighten the supporting paragraph so it states what Chainfren does and who it serves without repeating later sections.

### 2. The argument

Keep the current four-part sequence:

1. The gap
2. The trap
3. The unlock
4. The thesis

Each step should use a short lead and a compact explanation. The argument should retain the attract and extract framing, present open rails as the unlock, and keep blockchain in its proper role as an enabling technology rather than the product. The section should link to the full Chainfren thesis for readers who want the longer case.

### 3. What we build

Show a simple list of seven public offerings:

1. Media Launchpad (TiVi)
2. Creator Growth OS
3. Community Engine
4. AI Agent Studio
5. Creator Network
6. Sabi
7. Star Factor

Each item should contain only its public name, one plain description, and a link where a public destination exists. Do not show status labels, platform notes, internal categories, or product maturity language.

The About page uses `Media Launchpad (TiVi)` as the visible name for the canonical TiVi product record. This is a presentation label only. The underlying product record, description, and destination remain canonical.

The About page uses this public description for Sabi: `Chainfren's home for broadcasts and publications on blockchains, AI, and the technologies unlocking the African economy.` This About-specific description replaces the shorter canonical description on this page only.

The descriptions must follow the approved public product context and avoid claims that overstate availability or results.

### 4. Work with us

Close with four simple visitor paths:

1. Creators
2. Brands
3. Partners
4. Potential hires

Each path should contain one short line and one direct link. Keep this section compact. It is a useful close, not another sales page.

## Sections to remove

Remove these sections from the About page:

- The arithmetic
- How the company is built
- How we work
- The road ahead
- Founder note
- FAQ
- The existing large closing banner

Their content remains available elsewhere where appropriate, especially in the full thesis and product pages.

## Content and voice

The copy should use simple words, short sentences, and direct statements. It should sound human and confident without promotional filler. It should follow the established Chainfren public thesis and preserve these ideas:

- Chainfren is a distribution-first company.
- Chainfren exists to enable Africans to own the full value their attention generates on the internet.
- Chainfren builds for creators, brands, and their audiences.
- Open rails are enabled by blockchain technology, but practical use matters more than speculation.
- The page must not expose internal operations, financial information, targets, or private product plans.

## Implementation boundaries

The existing route and overall visual language will remain. The implementation should simplify the current content source and page component instead of creating a second About page system.

The page metadata must describe the shorter page accurately. Structured data should keep the AboutPage, Organization reference, and breadcrumb. Remove FAQ and founder entities when their corresponding public sections are removed.

The implementation should remove unused component state, imports, and rendering helpers that only support deleted sections.

## Verification

Verification should confirm that:

- The page renders only the four approved sections.
- The seven approved offerings appear once and in the approved order.
- No status or maturity label appears in the product list.
- Removed sections no longer appear in the page or its structured data.
- The full thesis link and four visitor paths work.
- The page has no browser console errors.
- The layout remains readable on desktop and mobile.
- Existing project tests and the production build pass.
