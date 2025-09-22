import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Debug: verify env vars are loaded (do not print secrets)
const googleId = process.env.AUTH_GOOGLE_ID;
const nextAuthUrl = process.env.NEXTAUTH_URL;
// Mask the client id for logging
const maskedId = googleId ? `${googleId.slice(0, 8)}…` : undefined;
// This will print once on server start or route init
console.log("[auth] NEXTAUTH_URL:", nextAuthUrl || "<undefined>");
console.log("[auth] AUTH_GOOGLE_ID set:", !!googleId, maskedId || "<undefined>");

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user, profile }: any) {
      if (account) {
        (token as any).provider = account.provider;
      }
      // Prefer user (from DB) when present; fallback to profile
      if (user) {
        token.name = user.name || token.name;
        token.email = user.email || token.email;
        token.picture = (user as any).image || (token as any).picture;
      } else if (profile) {
        token.name = (profile as any).name || token.name;
        token.email = (profile as any).email || token.email;
        token.picture = (profile as any).picture || (token as any).picture;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = {
        ...session.user,
        id: token.sub as string,
        name: token.name as string | undefined,
        email: token.email as string | undefined,
        image: (token as any).picture as string | undefined,
      } as any;
      return session;
    },
  },
};


