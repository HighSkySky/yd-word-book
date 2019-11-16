#!/usr/bin/env node

import commander from 'commander';
import { searchWord } from './lib/search-word';
import { toParallel } from './utils/toParallel';

const program = new commander.Command();

let useSubCommand = false;

(() => {
  let words: string[] = [];
  program
    .arguments('<word> [otherWords...]')
    .action(async (word: string, otherWords?: string[]) => {
      if (word) words.push(word);
      if (otherWords) words = words.concat(otherWords);

      if (!useSubCommand && words.length > 0) {
        console.log(`🔍  Search word...`);
        await toParallel(
          words.map(w => () => searchWord(w)),
          2
        );
      }
    });
})();

program.parse(process.argv);
