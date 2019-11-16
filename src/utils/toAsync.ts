/**
 * 配合 await 以同步的模式捕获 Error，便于处理异常
 * @param { Promise } promise
 */
export async function toAsync<T = any>(
  promise: Promise<T>
): Promise<[T, undefined] | [undefined, Error]> {
  try {
    const result = await Promise.resolve(promise);
    return [result, undefined];
  } catch (error) {
    return [undefined, error];
  }
}
