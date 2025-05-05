import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

const redirects = {
  patterns: [
    '1196943',
    '1370264',
    '251898',
    '43971',
    '14159',
    '188306',
    '15864',
    '37822',
    '52696',
    '456756',
    '399624',
    '254171',
    '666390',
    '11763',
    '14163',
    '32680',
    '291154',
    '35053',
    '320295',
    '17478',
    '14194',
    '44977',
    '22609',
    '13986',
    '19404',
    '210915',
    '325138',
    '85985',
    '192534',
    '377985',
    '8453',
    '215211',
    '250551',
    '493623',
    '4253',
    '103640',
    '132316',
    '678999',
    '14162',
    '30627',
    '73443',
    '30244',
    '296690',
    '25638',
    '82698',
    '44613',
    '64879',
    '63683',
    '591101',
    '287767',
    '206202',
    '74458',
    '179711',
    '139656',
    '455470',
    '11518',
    '26277',
    '206198',
    '46415',
    '19616',
    '204848',
    '864692',
    '29538',
    '472470',
    '14072',
    '26815',
    '20656',
    '15084',
    '611598',
    '534081',
    '206410',
    '539686',
    '209410',
    '28472',
    '496327',
    '376812',
    '14165',
    '14193',
    '984092',
    '206821',
    '14214',
    '472138',
    '720557',
    '441909',
    '266038',
    '4251',
    '585268',
    '161447',
  ],
  redirect_to: '/removed',
};

export async function middleware(request: NextRequest) {
  const urlPath = request.nextUrl.pathname;

  const shouldRedirect = redirects.patterns.some((pattern) => urlPath.includes(pattern));
  if (shouldRedirect) {
    return NextResponse.redirect(new URL(redirects.redirect_to, request.url));
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard'],
};
