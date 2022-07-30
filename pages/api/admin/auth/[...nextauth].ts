// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import GithubAPI from "utils/GithubAPI";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const providers = [
    GithubProvider({
      clientId: "",
      clientSecret: "",
    }),
  ];

  return await NextAuth(req, res, {
    providers,
    callbacks: {
      session({ session, token }) {
        return session;
      },
    },
  });
}
