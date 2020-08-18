const fs = require('fs')
const prompts = require('prompts')
const { exec } = require('child_process')
const chalk = require('chalk');

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
    gitStatus(gitStatusCallback) {
        exec('git status -s', (err, stdout, stderr) => {
            if (err) console.log(err);
            if (stderr) console.log(stderr);
            if (stdout) gitStatusCallback(stdout)
        })
    }

    async checkFiles(callback) {
        if (this.isGitRepo()) {

            this.gitStatus((gitStatusStdout) => {
                warnLog(`there some ${chalk.underline('untracked & uncommited')} files :`)
                greenLog(gitStatusStdout)

                prompts({
                    type: 'confirm',
                    name: 'value',
                    message: 'r u sure to continue ?',
                    initial: true
                })
                    .then((answer) => {
                        if (answer.value) {
                            callback.call()
                        }
                        else {
                            process.exit();
                        }
                    })
            })


        }
    }
}

module.exports = Git
