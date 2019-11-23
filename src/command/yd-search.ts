import commander from 'commander';
import { searchWord } from '../lib/search-word';
import { toParallel } from '../utils/toParallel';

const program = new commander.Command();

program
  .arguments('<words> [otherWords...]')
  .action(async (word: string, otherWords: string[] = []) => {
    console.log(`🔍  Search word...`);
    if (word) {
      await searchWord(word);
      await toParallel(
        otherWords.map(w => () => searchWord(w)),
        2
      );
    }
  });

program.parse(process.argv);
