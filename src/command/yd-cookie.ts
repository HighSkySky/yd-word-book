import commander from 'commander';
import * as readline from 'readline';
import { saveCookies, cleanCookies } from '../lib/cookie';
import log from '../lib/log';
const program = new commander.Command();

program
  .command('add [cookies]')
  .description('add local cookies')
  .action(async cookies => {
    const cookiesString: string = cookies;
    const cookiesList = cookiesString.split('; ');
    await saveCookies(cookiesList);
    log.success();
  });

program
  .command('clean')
  .description('clean all local cookies')
  .action(async () => {
    log.warn('You will remove all local cookie, please check it');

    const checkReadLine = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const isCheck = await new Promise<boolean>(resolve => {
      checkReadLine.question('Would you like to clean?: [Y/n]: ', value => {
        value = value.trim();
        checkReadLine.close();
        resolve(value === 'Y');
      });
    });

    if (!isCheck) return log('exit');

    cleanCookies();
    log.success();
  });

program.parse(process.argv);
