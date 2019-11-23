import axios from 'axios';
import { cookiesToString, saveCookies } from '../utils/cookie';

axios.defaults.headers = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  Connection: 'keep-alive',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'cross-site',
  'Upgrade-Insecure-Requests': 1,
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
  Host: 'www.youdao.com'
};

axios.interceptors.request.use(async config => {
  const cookiesString = await cookiesToString();
  const cookie = [cookiesString];
  const cookieStrings = config.headers['Set-Cookie'];
  if (cookieStrings) cookie.push(cookieStrings);
  config.headers['Cookie'] = cookie.join(';');
  if (!config.headers.Referer) config.headers.Referer = config.url;
  return config;
});

axios.interceptors.response.use(async response => {
  const { headers } = response;
  const cookieStrings = headers['set-cookie'] || [];
  saveCookies(cookieStrings);
  return response;
});

export const makeRequest = axios;
