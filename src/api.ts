import { makeRequest } from './utils/make-request';

export const search = async (word: string) => {
  return makeRequest(`http://www.youdao.com/w/eng/${encodeURI(word)}`);
};

export const login = async () => {
  return makeRequest('http://account.youdao.com/login?service=dict');
};
