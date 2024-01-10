/*
 * @Author: Jovy
 * @Date: 2024-01-03 16:38:58
 * @LastEditTime: 2024-01-03 17:37:34
 * @LastEditors: Jovy
 * @Description: 获取远程模板和版本信息
 * @FilePath: \cli-demo\long-cli\lib\http.js
 * ==雁过留声，码过留名。==
 */
const { Octokit } = require("@octokit/core");
const fetch = require("node-fetch");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({
  request: {
    fetch,
  },
});

async function getRepoList() {
  const response = await octokit.request("GET /orgs/{org}/repos", {
    org: "facebook",
    // type: "private",
  });

  // console.log(response.data);
  return response.data;
}

async function getTagList(repo) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/tags", {
    owner: "facebook",
    repo,
  });
  return response.data;
}

module.exports = {
  getRepoList,
  getTagList,
};
