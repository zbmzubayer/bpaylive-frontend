import { type NextAuthOptions } from "next-auth";
import { type AdapterUser } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";

import { ENV_CLIENT, ENV_SERVER } from "@/config";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${ENV_CLIENT.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Something went wrong!");
        }
        const data = await res.json();
        const user: AdapterUser = data.data;
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin",
    error: "/admin",
  },
  secret: ENV_SERVER.AUTH_SECRET,
};
