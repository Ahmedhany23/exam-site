import { NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
  // Block access to homepage `/`
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/not-found', request.url))
    // You can redirect to `/login`, `/blocked`, or anywhere you want
  }

  return NextResponse.next()
}

// Apply middleware only on `/`
export const config = {
  matcher: ['/'], 
}
