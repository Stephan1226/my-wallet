import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // Protect dashboard and api routes
      const isProtected = nextUrl.pathname.startsWith('/') && !nextUrl.pathname.startsWith('/login') && !nextUrl.pathname.startsWith('/register');

      // If trying to access protected route but not logged in
      if (isProtected && !isLoggedIn) {
        return false;
      }

      // If logged in and on login/register page, redirect to dashboard
      if (isLoggedIn && (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/register'))) {
        return Response.redirect(new URL('/', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Configured in auth.ts
} satisfies NextAuthConfig;
