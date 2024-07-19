// src/pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

console.log({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  nextAuthSecret: process.env.NEXTAUTH_SECRET,
  nextAuthUrl: process.env.NEXTAUTH_URL,
});

const prisma = new PrismaClient();

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const email = user.email || '';
      const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
      if (adminEmails.includes(email)) {
        await prisma.user.update({
          where: { email },
          data: { role: 'admin' },
        });
        user.role = 'admin';
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

export default NextAuth(options);
