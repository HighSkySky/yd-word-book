#!/usr/bin/env node

import commander from 'commander';
import { searchWord } from './lib/search-word';
import { toParallel } from './utils/toParallel';

const program = new commander.Command();

let useSubCommand = false;

program
  .arguments('<word> [otherWords...]')
  .action(async (word: string, otherWords: string[] = []) => {
    if (!useSubCommand) {
      console.log(`🔍  Search word...`);
      if (word) {
        await searchWord(word);
        await toParallel(
          otherWords.map(w => () => searchWord(w)),
          2
        );
      }
    }
  });

program.version('0.0.1', '-v, --version', 'output the version number');

program.parse(process.argv);
