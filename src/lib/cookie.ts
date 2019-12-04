import * as path from 'path';
import * as fs from 'fs';
import { promisify } from 'util';
import cookieUtils from 'cookie';
import mkdirp from 'mkdirp';

export interface CustomCookies {
  [key: string]: string | undefined;
}

const cookieCachePath = path.resolve(__dirname, '../..', '.cache/cookie');
const cookieCache = path.resolve(cookieCachePath, 'index.json');

export const parseCookies = (cookieStrings: string[]): CustomCookies =>
  cookieStrings.reduce((customCookies, cookieString) => {
    const parsedCookie = cookieUtils.parse(cookieString);
    const key = Object.keys(parsedCookie)[0];
    const value = parsedCookie[key];
    customCookies[key] = value;
    return customCookies;
  }, {} as CustomCookies);

export const {
  loadCookies,
  saveCookies,
  removeCookies,
  cleanCookies
} = (() => {
  let cookies: CustomCookies;

  const load = async () => {
    if (!cookies) {
      await promisify(mkdirp)(cookieCachePath);
      try {
        const cookieString = await promisify(fs.readFile)(cookieCache, {
          encoding: 'utf8'
        });
        if (cookieString) {
          cookies = JSON.parse(cookieString);
        }
      } catch (error) {
        cookies = {};
      }
    }
    return cookies;
  };

  const save = async (cookieStrings: string[]) => {
    const parasedCookies = parseCookies(cookieStrings);
    const nowCookies = await load();
    cookies = Object.assign({}, nowCookies, parasedCookies);
    await promisify(fs.writeFile)(cookieCache, JSON.stringify(cookies));
  };

  const remove = async (cookieNames: string[]) => {
    cookieNames.forEach(name => {
      cookies[name] = undefined;
    });
    await promisify(fs.writeFile)(cookieCache, JSON.stringify(cookies));
  };

  const clean = async () => {
    cookies = {};
    await promisify(fs.writeFile)(cookieCache, JSON.stringify(cookies));
  };

  return {
    loadCookies: load,
    saveCookies: save,
    removeCookies: remove,
    cleanCookies: clean
  };
})();

export const cookiesToString = async () => {
  const cookies = await loadCookies();
  const cookieStrings = Object.keys(cookies).map(key =>
    [key, cookies[key]].join('=')
  );
  return cookieStrings.join(';');
};
