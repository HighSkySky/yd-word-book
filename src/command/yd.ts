#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .version('0.0.4', '-v, --version', 'output the version number')
  .command('search', "search words's translate", { isDefault: true })
  .command('login', 'login netease email accout')
  .command('cookie', 'manage local cookie')
  .parse(process.argv);
