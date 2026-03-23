import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Check credentials against environment variables
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (!adminUsername || !adminPassword) {
          console.error('ADMIN_USERNAME or ADMIN_PASSWORD not set in environment');
          return null;
        }

        if (
          credentials.username === adminUsername &&
          credentials.password === adminPassword
        ) {
          return {
            id: '1',
            name: 'Admin',
            email: 'admin@jokicodingdumai.com',
            role: 'admin',
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.AUTH_SECRET,
});
