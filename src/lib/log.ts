import colors from 'colors';

interface BaseLog {
  (...args: string[]): void;
}

interface Log extends BaseLog {
  info: BaseLog;
  warn: BaseLog;
  success: BaseLog;
  error: BaseLog;
}

const log: Log = (...args) => console.log(...args);
log.info = (...args) => console.log(colors.blue('info'), ...args);
log.warn = (...args) => console.log(colors.yellow('warn'), ...args);
log.success = (...args) => console.log(colors.green('success'), ...args);
log.error = (...args) => console.log(colors.red('error'), ...args);

export default log;
