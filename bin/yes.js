#!/usr/bin/env node

// Check node version before requiring/doing anything else
// The user may be on a very old node version
const program = require('commander');
program
    .version(require('../package').version)
    .usage('<command> [options]');
program
    .command('create <app-name>')
    .action((name, cmd) => {
        const options = cmd;
        require('../commands/create')(name, options);
    });