/*
 * @Author: Jovy
 * @Date: 2024-01-03 15:37:56
 * @LastEditTime: 2024-01-10 13:16:53
 * @LastEditors: Jovy
 * @Description: 项目生成器
 * @FilePath: \cli-demo\long-cli\lib\Generator.js
 * ==雁过留声，码过留名。==
 */
const downloadGitRepo = require("download-git-repo");
const { getRepoList, getTagList } = require("./http");
const inquirer = require("inquirer");
const ora = require("ora");

// 1. 写一个Generator类，接收参数name和targetDir
// 2. 在Generator类中写一个async getRepo()方法，用于获取用户选择的模板
// 3. 在Generator类中写一个async getTag()方法，用于获取用户选择的版本
// 4. 在Generator类中写一个async download()方法，用于下载模板
// 5. 在Generator类中写一个async create()方法，用于创建项目
// 6. 在Generator类中写一个async install()方法，用于安装依赖

class Generator {
  constructor(name, targetDir) {
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
    // 远程下载
    this.downloadGitRepo = downloadGitRepo;
  }

  // 获取模板名称
  async getRepo() {
    const spinner = ora("fetching template ....").start();
    const repos = await getRepoList();
    spinner.succeed();
    if (!repos) return;

    // 过滤我们需要的模板名称
    const repoNames = repos.map((item) => item.name);

    // 询问用户选择哪个模板
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "repo",
        message: "Please select a template to create the project",
        choices: repoNames,
      },
    ]);

    return answers.repo;
  }

  // 获取版本信息
  async getTag(repo) {
    const spinner = ora("fetching tag ....").start();
    const tags = await getTagList(repo);
    spinner.succeed();
    if (!tags) return;

    // 过滤我们需要的版本名称
    const tagNames = tags.map((item) => item.name);

    // 询问用户选择哪个版本
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "tag",
        message: "Please select a version to create the project",
        choices: tagNames,
      },
    ]);

    return answers.tag;
  }

  // 从GitHub下载函数
  download(repo, tag) {
    let api = `facebook/${repo}#${tag}`;
    return new Promise((resolve, reject) => {
      this.downloadGitRepo(api, this.targetDir, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  async create() {
    // 1. 获取模板名称
    const repo = await this.getRepo();
    // 2. 获取版本信息
    const tag = await this.getTag(repo);
    console.log(repo, tag);
    // 3. 下载模板到模板目录
    // await this.download('facebook/create-react-app', 'v5.0.1');
    await this.download(repo, tag);
    // 4. 安装依赖
    // await this.install();
  }
}

module.exports = Generator;
