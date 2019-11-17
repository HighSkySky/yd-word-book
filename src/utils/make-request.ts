import axios from 'axios';
import { cookiesToString, saveCookies } from '../utils/cookie';

axios.defaults.headers = {
  Accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
  Connection: 'keep-alive',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Upgrade-Insecure-Requests': 1,
  'User-Agent':
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Mobile Safari/537.36'
};

axios.interceptors.request.use(async config => {
  const cookiesString = await cookiesToString();
  const cookieStrings = config.headers['set-cookie'];
  config.headers['set-cookie'] = [cookieStrings, cookiesString].join(';');
  return config;
});

axios.interceptors.response.use(async response => {
  const { headers } = response;
  const cookieStrings = headers['set-cookie'] || [];
  saveCookies(cookieStrings);
  return response;
});

export const makeRequest = axios;
