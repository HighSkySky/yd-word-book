import { toAsync } from './toAsync';

type AsyncFunc = () => Promise<any>;

/**
 * 并发执行异步函数，并且可以设置最大并发值
 * @param params
 * @param { Array } params.asyncFuncList - 异步函数集合
 * @param { number } params.limit - 最大并发值
 */
export async function toParallel(
  asyncFuncList: Array<AsyncFunc>,
  limitNum?: number
): Promise<any[]> {
  if (
    !Array.isArray(asyncFuncList) ||
    asyncFuncList.some(func => typeof func !== 'function')
  ) {
    throw new Error('asyncFuncList must be function array');
  }

  if (limitNum !== undefined) {
    if (isNaN(limitNum)) {
      throw new Error('limitNum must be number');
    }

    if (+limitNum < 1) {
      throw new Error('limitNum must >= 1 or not provided');
    }
  }

  if (asyncFuncList.length === 0) {
    return Promise.resolve([]);
  }

  if (limitNum === undefined) {
    return Promise.all(asyncFuncList.map(func => func()));
  }

  const length = asyncFuncList.length;
  const list = asyncFuncList.slice();
  const limit = +limitNum;
  let running = 0;
  let result: any[] = [];

  async function next(resolve: (num: any) => void, isInit?: boolean) {
    if (isInit || (running < limit && list.length > 0)) {
      const asyncFunc = list.shift() as AsyncFunc;
      const num = length - list.length - 1;
      running++;
      const [data, error] = await toAsync(asyncFunc());
      running--;
      result[num] = error || data;
      next(resolve);
    } else if (running === 0 && list.length === 0) {
      resolve(result);
    }
  }

  return new Promise(resolve => {
    // 初始化最初的并发
    while (running < limit && list.length > 0) {
      next(resolve, true);
    }
  });
}
