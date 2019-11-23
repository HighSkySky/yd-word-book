import commander from 'commander';
import * as readline from 'readline';
import { hex_md5 } from '../lib/logincom';
import { login } from '../api';
import log from '../lib/log';

const program = new commander.Command();

program.action(async () => {
  const loginReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const createInput = (prompt: string) =>
    new Promise<string>(resolve => {
      loginReadLine.question(prompt, value => {
        value = value.trim();
        if (!value) return loginReadLine.close();
        resolve(value);
      });
    });

  const username = await createInput('请输入网易邮箱：');
  const password = await createInput('请输入密码：');
  loginReadLine.close();

  const { headers } = await login({ username, password: hex_md5(password) });
  if (!headers['set-cookie']) {
    log.error(
      `login fail, pleace check your email or pwaaword current and try again`
    );
  }
});

program.parse(process.argv);
