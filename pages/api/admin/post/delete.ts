// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Octokit,} from "octokit";
import { HTMLContent,} from "@tiptap/react";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { RESPONSE_POST } from "types/types";
import GithubAPI from "utils/GithubAPI";
import parseContentFromGithub from "utils/parseContentFromGithub";



type BodyReq = {
  title: string;
  content: HTMLContent;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RESPONSE_POST<any>>
) {
  const { method, body } = req;
  const github=GithubAPI()

  if (method !== "DELETE") {
    res
      .status(405)
      .send({ data:null,status: "failed", errorMsg: "Only DELETE requests allowed" });
    return;
  }

  const { title} = body as BodyReq;

  try {
    const slug = title.replaceAll(" ", "-").toLowerCase();
    const username = await github.rest.users.getAuthenticated();

    const indexJson = await github.rest.repos.getContent({
      owner: username.data.login,
      path: `index.json`,
      repo: process.env.REPO_NAME||"",
    });

    let JsonData = parseContentFromGithub<any>(indexJson.data);

    if (JsonData) {
      JsonData = JSON.parse(JsonData) as Array<any>;
      const indexPost = JsonData.filter((post: any) => post.slug !== slug);

      if (indexPost) {
        const checkPostExist = await github.rest.repos.getContent({
          owner: username.data.login,
          path: `post/${slug}`,
          repo: process.env.REPO_NAME||"",
        });

        if (checkPostExist.data) {
          const pr = await github.createPullRequest({
            owner: username.data.login,
            repo: process.env.REPO_NAME||"",
            title: `Delete new post ${title}`,
            body: "",
            head: slug,
            createWhenEmpty: true,
            forceFork:
              false /* optional: force creating fork even when user has write rights */,
            changes: [
              {
                /* optional: if `files` is not passed, an empty commit is created instead */
                files: {
                  [`post/${slug}/content.html`]: null,
                  [`index.json`]: JSON.stringify(indexPost),
                },

                commit: "DELETE",
              },
            ],
          });

          if (pr) {
            await github.rest.pulls.merge({
              owner: username.data.login,
              repo: process.env.REPO_NAME||"",
              pull_number: pr?.data.number,
            });
            
            return res.status(200).send({ data:null,status: "success" });
            
          }
        }
      } else {
        return res
          .status(404)
          .send({ data:null,status: "failed", errorMsg: "POST NOT INDEXED" });
        
      }
    }
  } catch (error) {
   
    return res.status(500).send({ data:null, status: "failed", errorMsg: error });
    
  }
}


