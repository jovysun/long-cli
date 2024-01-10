#! /usr/bin/env node

const { Command } = require("commander");
const program = new Command();
const chalk = require("chalk");
const figlet = require("figlet");

program
  .name("long")
  .description("CLI to create project")
  .version(`v${require("../package.json").version}`);

program
  .command("create <app-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exist")
  .action((name, options) => {
    // console.log('name', name, 'options', options);
    require("../lib/create.js")(name, options);
  });

program
  // 配置版本号信息
  .version(`v${require("../package.json").version}`)
  .usage("<command> [option]");
program.on("--help", () => {
  // 使用 figlet 绘制 Logo
  console.log(
    "\r\n" +
      figlet.textSync("long", {
        font: "Ghost",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true,
      })
  );
  // 新增说明信息
  console.log(`\r\nRun ${chalk.cyan(`long <command> --help`)} show details\r\n`);
});

program.parse();
