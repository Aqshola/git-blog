// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { HTMLContent } from "@tiptap/react";
import GithubAPI from "utils/GithubAPI";
import { POST_TYPE, RESPONSE_POST } from "types/types";

type BodyReq = {
  title: string;
  content: HTMLContent;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RESPONSE_POST<POST_TYPE|null>>
) {
  const { method, body } = req;
  const github = GithubAPI();

  if (method !== "PUT") {
    res
      .status(405)
      .send({data:null, status: "failed", errorMsg: "Only PUT requests allowed" });
    return;
  }

  const { title, content } = body as BodyReq;

  try {
    const slug = title.replaceAll(" ", "-").toLowerCase();
    const username = await github.rest.users.getAuthenticated();

    try {
      const checkPostExist = await github.rest.repos.getContent({
        owner: username.data.login,
        path: `post/${slug}`,
        repo: `gitblog-content`,
      });

      if (checkPostExist.data) {
        const objectPost = {
          title: title,
          path: `post/${slug}/content.html`,
          createAt: new Date(),
          slug: slug,
        };

        const path = `post/${slug}/content.html`;
        const pr = await github.createPullRequest({
          owner: username.data.login,
          repo: "gitblog-content",
          title: `Create new post ${title}`,
          body: "",
          head: slug,
          createWhenEmpty: true,
          changes: [
            {
              /* optional: if `files` is not passed, an empty commit is created instead */
              files: {
                [path]: content,
              },
              commit: "NEW POST",
            },
          ],
        });

        if (pr) {
          await github.rest.pulls.merge({
            owner: username.data.login,
            repo: "gitblog-content",
            pull_number: pr?.data.number,
          });
          return res
            .status(200)
            .send({
              data: { ...objectPost, path: path, content: content },
              status: "success",
            });
        }
      }
    } catch (error: any) {
      res.status(404).send({ data:null,status: "failed", errorMsg: error });
    }
  } catch (error) {
    res.status(500).send({ data:null,status: "failed", errorMsg: error });
  }
}
