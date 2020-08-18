const fs = require('fs')
const path = require('path');
const util = require('util')
const prompts = require('prompts')
const { exec } = require('child_process')
const chalk = require('chalk');
const { red } = require('chalk');

const log = console.log
const redLog = (...logs) => {
    return log(chalk.red(...logs))
}
const greenLog = (...logs) => {
    return log(chalk.green(...logs))
}
const warnLog = (...logs) => {
    return log(chalk.yellow(...logs))
}

class Git {
    constructor() {
        this.existsSync = fs.existsSync;
    }

    isGitRepo() {
        return this.existsSync('.git')
    }

    untracked(untrackedCallback) {
        exec('git ls-files --others --exclude-standard', (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            if (stdout) untrackedCallback(stdout);
        })
    }

    uncommited(uncommitedCallback) {
        exec('git diff --name-only', (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            if (stdout) uncommitedCallback(stdout)
        })
    }

    async checkFiles(callback) {
        if (this.isGitRepo()) {

            this.untracked((untrackStdout) => {
                warnLog('there some untracked files :')
                redLog(untrackStdout)

            })
            this.uncommited(uncommitedStdOut => {
                warnLog('there some uncommited files :')
                greenLog(uncommitedStdOut)
            });



        }
    }
}

module.exports = Git