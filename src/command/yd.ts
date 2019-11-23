#!/usr/bin/env node

import commander from 'commander';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('output the version number')
  .command('search', "search words's translate", { isDefault: true })
  .command('login', 'login netease email accout')
  .parse(process.argv);
