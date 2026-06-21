import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const ADMIN_EMAILS = ["hamaamohamad7@gmail.com", "qaraman.it2021@gmail.com"];

export function isAdmin(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export function getAccountTier(email: string | null | undefined): "Premium" | "Free user" {
  return isAdmin(email) ? "Premium" : "Free user";
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account?.provider === "google" && profile && "picture" in profile) {
        const picture = profile.picture;
        if (typeof picture === "string") {
          token.picture = picture;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.picture) {
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
