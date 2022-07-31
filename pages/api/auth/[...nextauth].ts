// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GithubAPI from "utils/GithubAPI";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT || "",
      clientSecret: process.env.OAUTH_SECRET || "",
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        const github = GithubAPI();
        const username = await github.rest.users.getAuthenticated();
        if (username.data.id.toString() === user.id) {
          return true;
        }

        return "/admin/login?error=true";
      },
    },
    secret: process.env.JWT_SECRET
  });
}
