import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
const mongoOptions = {};
const AUTH_STRATEGY = "jwt";

// Ensure MongoDB client connection is handled globally
const mongoClientPromise = mongoUri
  ? (globalThis._mongoClientPromise ||= new MongoClient(mongoUri, mongoOptions).connect())
  : null;

// Define authentication providers
const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    profile: ({ sub, given_name, name, email, picture }) => ({
      id: sub,
      name: given_name || name,
      email,
      image: picture,
      createdAt: new Date(),
    }),
  }),
  ...(mongoClientPromise
    ? [
        EmailProvider({
          server: process.env.EMAIL_SERVER,
          from: config.mailgun.fromNoReply,
        }),
      ]
    : []),
];

// Define authentication callbacks
const authCallbacks = {
  session: async ({ session, token }) => ({
    ...session,
    user: session?.user ? { ...session.user, id: token.sub } : session.user,
  }),
};

// Export NextAuth options separately
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers,
  callbacks: authCallbacks,
  session: { strategy: AUTH_STRATEGY },
  ...(mongoClientPromise && { adapter: MongoDBAdapter(mongoClientPromise) }),
};

// Export NextAuth handler
const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
