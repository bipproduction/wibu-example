// // app/api/auth/[...nextauth]/route.ts

// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async session({ session, token, user }) {
//       return session;
//     },
//     async signIn({ user, account, profile, email, credentials }) {
//       return true;
//     },
//   },
//   pages: {
//     signIn: "/page/login-github", // Custom sign in page URL
//     signOut: "/auth/signout", // Custom sign out page URL
//     error: "/auth/error", // Error code passed in query string as ?error=
//     verifyRequest: "/auth/verify-request", // (used for check email message)
//     newUser: "/auth/new-user", // If set, new users will be directed here on first sign in
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };
export async function GET() {
  return new Response("hello");
}
