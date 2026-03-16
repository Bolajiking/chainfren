import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

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
    const { firstName, lastName, email, message } = body

    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'First name, last name, email, and message are required.' },
        { status: 400 }
      )
    }

    const submission = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      company: body.company || '',
      interest: body.interest || '',
      message: body.message,
      source: body.source || 'unknown',
      submittedAt: new Date().toISOString(),
    }

    await ensureDataFile()
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    const submissions = JSON.parse(raw)
    submissions.push(submission)
    await fs.writeFile(DATA_FILE, JSON.stringify(submissions, null, 2), 'utf-8')

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 })
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
