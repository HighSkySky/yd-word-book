import cheerio from 'cheerio';
import colors from 'colors';
import checkChinese from 'is-chinese';
import { search } from '../api/search';

const parseText = (html: string, isChinese: boolean) => {
  const texts = [];
  const $ = cheerio.load(html, {
    ignoreWhitespace: true
  });
  if (isChinese) {
    // 中文翻译
    texts.push(
      $('#phrsListTab .trans-container .wordGroup')
        .text()
        .replace(/\s+/g, '')
    );
  } else {
    // 音标
    texts.push(
      $('#phrsListTab .baav')
        .text()
        .replace(/\s+/g, '')
        .trim()
    );

    // 英文翻译
    texts.push(
      $('#phrsListTab .trans-container ul')
        .text()
        .replace(/[\t\v\r\f ]+/gm, '')
        .trim()
    );

    // 英文形式
    texts.push(
      $('#phrsListTab .trans-container .additional')
        .text()
        .replace(/\s+/gm, ' ')
        .trim()
    );
  }

  return texts.filter(text => text).join('\n');
};

export const searchWord = async (word: string) => {
  const { data, config } = await search(word);
  console.log(`${colors.green('success')} Get '${word}' translate`);
  console.log(`${colors.blue('info')} Visit : ${config.url} to see more.`);
  console.log(parseText(data, checkChinese(word)));
};
