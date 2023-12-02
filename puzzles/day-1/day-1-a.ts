import { getnumber, readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day1a(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;
  for (const line of data) {
    console.log(getnumber(line));
    sum += getnumber(line);
  }
  return sum;
}

const answer = await day1a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
