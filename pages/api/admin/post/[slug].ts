// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import GithubAPI from "utils/GithubAPI";

import {POST_TYPE, RESPONSE_POST} from "types/types"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RESPONSE_POST<POST_TYPE|null>>
) {
  const { method} = req;

  if (method !== "GET") {
    res
      .status(405)
      .send({ data:null,status: "failed", errorMsg: "Only GET requests allowed" });
    return;
  }

  const { slug } = req.query;
  const github =GithubAPI()

  try {
    const username = await github.rest.users.getAuthenticated();

    const indexJson = await github.rest.repos.getContent({
      owner: username.data.login,
      path: `index.json`,
      repo: `gitblog-content`,
    });

    let JsonData = parseContentFromGithub<any>(indexJson.data);

    if (JsonData) {
      JsonData = JSON.parse(JsonData) as Array<any>;
      const indexPost = JsonData.find((post: any) => post.slug === slug);

      if (indexPost) {
        const postDetailJson = await github.rest.repos.getContent({
          owner: username.data.login,
          path: indexPost.path,
          repo: `gitblog-content`,
        });
        const htmlContent = parseContentFromGithub<string>(postDetailJson.data);
        res.status(200).send({
          data: {
            path: indexPost.path,
            title:indexPost.title,
            slug:indexPost.slug,
            createAt:indexPost.createAt,
            content: htmlContent,
          },
          status: "success",
        });
        return;
      } else {
        res
          .status(404)
          .send({ data:null,status: "failed", errorMsg: "POST NOT INDEXED" });
        return;
      }
    }
  } catch (error) {
    res.status(500).send({ data:null,status: "failed", errorMsg: error });
    return;
  }
}

function parseContentFromGithub<T>(githubData: any): T | undefined {
  if (!Array.isArray(githubData)) {
    let parsedGivenData = githubData as any;
    //@ts-nocheck
    let parsedData = Buffer.from(
      parsedGivenData.content,
      "base64"
    ).toString() as T;

    return parsedData;
  }
}
