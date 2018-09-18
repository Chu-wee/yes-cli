const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = (...args) => {
    return create(...args).catch(err => {
        // stopSpinner(false); // do not persist
        // error(err);
        // if (!process.env.VUE_CLI_TEST) {
        //     process.exit(1);
        // }
    });
};

async function create (projectName, options) {
    //当前目录
    const cwd = options.cwd || process.cwd();
    const targetDir = path.resolve(cwd, projectName || '.');
    const { ok } = await inquirer.prompt([
        {
            name: 'ok',
            type: 'confirm',
            message: `是否在当前目录中创建项目?[${targetDir}]`
        }
    ]);
    if (!ok) {
        return;
    }
    if (fs.existsSync(targetDir)) {
        var files = fs.readdirSync(path);
        if(files.length>0){
            console.error(chalk.red('该目录非空，无法创建项目！'));
            exit(1);
        }
    }

    createByTempate(projectName);
}