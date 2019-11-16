import cheerio from 'cheerio';
import colors from 'colors';
import { search } from '../api/search';

const parseText = (html: string) => {
  const texts = [];
  const $ = cheerio.load(html, {
    ignoreWhitespace: true
  });
  texts.push(
    $('#phrsListTab .baav')
      .text()
      .replace(/\s+/g, '')
  );
  $('#phrsListTab .trans-container li').each((_, ele) => {
    texts.push($(ele).text());
  });
  return texts.filter(text => text.trim()).join('\n');
};

export const searchWord = async (word: string) => {
  const { data, config } = await search(word);
  console.log(`${colors.green('success')} Get '${word}' translate`);
  console.log(`${colors.blue('info')} See more form: ${config.url}`);
  console.log(parseText(data));
};
