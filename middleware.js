import { NextResponse } from 'next/server'

export function middleware() {
  const response = NextResponse.next()
  const exportToken = process.env.THESIS_EXPORT_TOKEN
  if (exportToken) response.headers.set('x-chainfren-thesis-export-token', exportToken)
  return response
}

export const config = { matcher: '/thesis/print' }
