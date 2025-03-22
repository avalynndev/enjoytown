import { NextRequest, NextResponse } from 'next/server';

const redirects = {
  patterns: ['1196943'],
  redirect_to: '/removed',
};

export function middleware(req: NextRequest): NextResponse {
  const url = req.nextUrl.pathname;

  const shouldRedirect = redirects.patterns.some((pattern) => url.includes(pattern));

  if (shouldRedirect) {
    return NextResponse.redirect(new URL(redirects.redirect_to, req.url));
  }

  return NextResponse.next();
}
