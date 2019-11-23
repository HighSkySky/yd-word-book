import commander from 'commander';
import { searchWord } from '../lib/search-word';
import { toParallel } from '../utils/toParallel';
import log from '../lib/log';

const program = new commander.Command();

let isSave = false;
// let isLocalSave = false;

program.option(
  '-s --save',
  'save word in netease word book',
  () => (isSave = true)
);
// .option('-l --local', 'save word in local', () => isLocalSave = true);

program
  .arguments('<words> [otherWords...]')
  .action(async (word: string, otherWords: string[] = []) => {
    if (!word) return;
    log(`🔍  Search word...`);
    await searchWord(word, isSave);
    await toParallel(
      otherWords.map(w => () => searchWord(w, isSave)),
      2
    );
  });

program.parse(process.argv);
