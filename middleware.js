import { NextResponse } from 'next/server';

export function middleware(request) {
  return NextResponse.rewrite(new URL('/vizmap.html', request.url));
}

export const config = {
  matcher: '/',
};
