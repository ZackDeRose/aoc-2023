import chalk from 'chalk';
import { readData } from '../../shared.ts';

export async function day1b(dataPath?: string) {
  const data = await readData(dataPath);
  let sum = 0;
  for (const line of data) {
    // console.log(getnumber(line));
    // console.log(replaceStringsToNumbers(line));

    // const readline = createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    // });

    // async function getInput(question: string): Promise<string> {
    //   return new Promise((resolve, reject) => {
    //     readline.question(question, (answer) => {
    //       readline.close();
    //       resolve(answer);
    //     });
    //   });
    // }
    // console.log(`What is the answer for "${line}"?`);
    // const userInput = await getInput('');
    console.log(line, getnumber(line));
    sum += getnumber(line);
    // const answer = getnumber(line);
    // if (+userInput !== answer) {
    //   console.error('Wrong answer! Try again.');
    //   throw new Error('Wrong answer! Try again.');
    // }
  }
  // console.log(replaceStringsToNumbers('twoone'));
  return sum;
}

const replaceMap = {
  zero: '0',
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function getnumber(line: string): number {
  const results = [getFirstNumber(line), getLastNumber(line)];
  console.log(results);
  return parseInt(results.join(''));
}

function getFirstNumber(line: string): string {
  for (let i = 0; i < line.length; i++) {
    if (digits.includes(line[i])) {
      return line[i];
    }
    for (const word of Object.keys(replaceMap)) {
      if (line.substring(i, i + word.length) === word) {
        return replaceMap[word];
      }
    }
  }
  throw new Error('No number found in line');
}

function getLastNumber(line: string): string {
  for (let i = line.length - 1; i >= 0; i--) {
    if (digits.includes(line[i])) {
      return line[i];
    }
    for (const word of Object.keys(replaceMap)) {
      // console.log(
      //   `"${line.substring(i - word.length + 1, i + 1)}"`,
      //   line,
      //   word
      // );
      // console.log(
      //   line.substring(i - word.length + 1, i + 1),
      //   word,
      //   line.substring(i - word.length + 1, i + 1) === word
      // );
      if (line.substring(i - word.length + 1, i + 1) === word) {
        return replaceMap[word];
      }
    }
  }
  throw new Error('No number found in line');
}

const answer = await day1b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
