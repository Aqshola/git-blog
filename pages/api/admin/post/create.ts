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
  res: NextApiResponse<RESPONSE_POST<POST_TYPE | null>>
) {
  const { method, body } = req;
  const github = GithubAPI();

  if (method !== "POST") {
    res.status(405).send({
      data: null,
      status: "failed",
      errorMsg: "Only POST requests allowed",
    });
    return;
  }

  const { title, content } = body as BodyReq;

  try {
    const slug = title.replaceAll(" ", "-").toLowerCase();
    const username = await github.rest.users.getAuthenticated();

    try {
      await github.rest.repos.get({
        owner: username.data.login,
        repo: process.env.REPO_NAME || "",
      });
    } catch (error: any) {
      if (error.status === 404) {
        await github.rest.repos.createForAuthenticatedUser({
          name: process.env.REPO_NAME || "",
          private: true,
        });
        github.request("PUT /repos/{owner}/{repo}/contents/{path}", {
          owner: "Aqshola",
          repo: process.env.REPO_NAME || "",
          path: "index.json",
          message: "test push",
          content: Buffer.from(JSON.stringify([])).toString("base64"),
        });
      }
    }

    try {
      const checkPostExist = await github.rest.repos.getContent({
        owner: username.data.login,
        path: `post/${slug}`,
        repo: process.env.REPO_NAME || "",
      });

      if (checkPostExist.data) {
        res.status(409).json({
          data: null,
          status: "failed",
          errorMsg: "Post already exist",
        });
        return;
      }
    } catch (error: any) {}

    //CREATE POST
    try {
      const indexJson = await github.rest.repos.getContent({
        owner: username.data.login,
        path: `index.json`,
        repo: process.env.REPO_NAME || "",
      });

      if (Array.isArray(indexJson.data)) {
      } else {
        let parsedIndexJson = indexJson.data as any;
        //@ts-nocheck
        let JsonData = JSON.parse(
          Buffer.from(parsedIndexJson.content, "base64").toString()
        ) as Array<any>;

        const objectPost = {
          title: title,
          path: `post/${slug}/content.html`,
          createAt: new Date(),
          slug: slug,
        };

        JsonData.unshift(objectPost);

        const pr = await github.createPullRequest({
          owner: username.data.login,
          repo: process.env.REPO_NAME || "",
          title: `Create new post ${title}`,
          body: "",
          head: slug,
          createWhenEmpty: true,

          base: "main" /* optional: defaults to default branch */,
          update:
            false /* optional: set to `true` to enable updating existing pull requests */,
          forceFork:
            false /* optional: force creating fork even when user has write rights */,
          changes: [
            {
              /* optional: if `files` is not passed, an empty commit is created instead */
              files: {
                [`post/${slug}/content.html`]: content,
                [`index.json`]: JSON.stringify(JsonData),
              },
              commit: "NEW POST",
            },
          ],
        });

        if (pr) {
          await github.rest.pulls.merge({
            owner: username.data.login,
            repo: process.env.REPO_NAME || "",
            pull_number: pr?.data.number,
          });
          return res
            .status(200)
            .send({ data: { ...objectPost, content }, status: "success" });
        } else {
          return res
            .status(500)
            .send({ data: null, status: "failed", errorMsg: "API ERROR" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    res.status(500).send({ data: null, status: "failed", errorMsg: error });
  }
}
