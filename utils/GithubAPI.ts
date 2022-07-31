import { createPullRequest } from "octokit-plugin-create-pull-request";
import { Octokit, App } from "octokit";

export default function GithubAPI() {
  const PluggedInOctokit = Octokit.plugin(createPullRequest);
  const github = new PluggedInOctokit({
    auth: process.env.GITHUB_KEY,
  });

  return github;
}
