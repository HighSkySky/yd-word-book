import cheerio from 'cheerio';
import checkChinese from 'is-chinese';
import * as api from '../api';
import log from './log';

const parseText = ($: CheerioStatic, word: string) => {
  const texts = [];
  if (checkChinese(word)) {
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

const saveWord = async ($: CheerioStatic, word: string) => {
  const isAdded = !$('.add_to_wordbook');
  if (isAdded) return;
  const { data } = await api.save(word);
  if (data.message === 'adddone') {
    log.success(`Add '${word}' to word book.`);
  }
};

export const searchWord = async (word: string, isSave: boolean) => {
  const { data, config } = await api.search(word);
  const $ = cheerio.load(data, {
    ignoreWhitespace: true
  });
  log.success(`Get '${word}' translate.`);
  if (isSave) await saveWord($, word);
  log.info(`Visit: '${config.url}' to see more.`);
  log(parseText($, word));
};
