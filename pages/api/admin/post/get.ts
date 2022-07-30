// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GithubAPI from "utils/GithubAPI";
import { POST_TYPE, RESPONSE_POST } from "types/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RESPONSE_POST<POST_TYPE[]>>
) {
  const { method, body } = req;
  const github = GithubAPI();

  if (method !== "GET") {
    res.status(405).send({
      data: [],
      status: "failed",
      errorMsg: "Only GET requests allowed",
    });
    return;
  }

  const username = await github.rest.users.getAuthenticated();

  try {
    const listPost = await github.rest.repos.getContent({
      owner: username.data.login,
      path: `index.json`,
      repo: `gitblog-content`,
    });
    let parsedListPost = listPost.data as any;

    let dataListPost = JSON.parse(
      Buffer.from(parsedListPost.content, "base64").toString()
    ) as Array<any>;

    return res.status(200).json({
      data: dataListPost,
      status: "success",
    });
  } catch (error: any) {
    res.status(error.status).json({
      data: [],
      status: "failed",
      errorMsg: "API Error",
    });
    return;
  }
}
