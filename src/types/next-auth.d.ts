// src/types/next-auth.d.ts
import { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role?: string;
    } & DefaultUser;
  }

  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}
