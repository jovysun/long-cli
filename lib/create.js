/*
 * @Author: Jovy
 * @Date: 2024-01-02 13:53:28
 * @LastEditTime: 2024-01-03 19:13:13
 * @LastEditors: Jovy
 * @Description: 简要描述该文件
 * @FilePath: \cli-demo\long-cli\lib\create.js
 * ==雁过留声，码过留名。==
 */
const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");
const Generator = require("./Generator");

module.exports = async function (projectName, options) {
  // 1. 验证projectName是否合法
  // 2. 创建项目
  // 3. 拉取模板
  // 4. 模板渲染
  // 5. 安装依赖
  // 6. 打印成功提示
  // console.log('projectName', projectName, 'options', options);
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      fs.removeSync(targetDir);
    } else {
      // 提示用户是否确定要覆盖
      const answers = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: `Target directory ${targetDir} already exists. Whould you like to overwrite it?`,
          default: false,
        },
      ]);

      if (answers.confirm) {
        fs.removeSync(targetDir);
      } else {
        return;
      }
    }
  }

  // 创建项目
  const generator = new Generator(projectName, targetDir);
  generator.create();
};
