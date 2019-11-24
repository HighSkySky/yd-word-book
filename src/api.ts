import { stringify } from 'querystring';
import checkChinese from 'is-chinese';
import { makeRequest } from './lib/make-request';

export const search = async (word: string) => {
  return makeRequest(`http://www.youdao.com/w/eng/${encodeURI(word)}`);
};

export const login = async (data: { username: string; password: string }) => {
  // 获取登陆基础的cookie
  await makeRequest({
    method: 'GET',
    url: 'http://account.youdao.com/login?service=dict',
    headers: {
      Host: 'account.youdao.com'
    }
  });
  const formData = Object.assign(
    {
      app: 'web',
      tp: 'urstoken',
      cf: 7,
      fr: 1,
      ru:
        'http://dict.youdao.com/wordbook/wordlist?keyfrom=login_from_dict2.index',
      product: 'DICT',
      type: 1,
      um: true,
      agreePrRule: 1,
      savelogin: 1
    },
    data
  );
  // 登陆
  return makeRequest({
    method: 'POST',
    url: 'https://logindict.youdao.com/login/acc/login',
    maxRedirects: 0,
    validateStatus: status => status < 400,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Host: 'logindict.youdao.com',
      Origin: 'http://account.youdao.com',
      Referer:
        'http://account.youdao.com/login?service=dict&back_url=http://dict.youdao.com/wordbook/wordlist%3Fkeyfrom%3Dlogin_from_dict2.index'
    },
    data: stringify(formData)
  });
};

export const save = (word: string) => {
  return makeRequest({
    method: 'GET',
    url: 'http://www.youdao.com/wordbook/ajax',
    params: {
      action: 'addword',
      q: word,
      date: new Date(),
      le: checkChinese(word) ? 'cn' : 'eng'
    },
    headers: {
      Referer: `http://www.youdao.com/w/eng/${word}/`,
      'X-Requested-With': 'XMLHttpRequest'
    }
  });
};
