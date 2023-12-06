import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4a(dataPath?: string) {
  const data = await readData(dataPath);
  const cards = parseData(data);
  console.log(cards);
  let score = 0;
  for (const card of cards) {
    let currentScore = 0;
    const numbersYouHaveHashMap = arrayToHashMap(card.numbersYouHave);
    for (const winningNumber of card.winningNumbers) {
      if (numbersYouHaveHashMap[winningNumber]) {
        if (currentScore === 0) {
          currentScore = 1;
        } else {
          currentScore *= 2;
        }
      }
    }
    score += currentScore;
  }
  return score;
}

const answer = await day4a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface Card {
  winningNumbers: number[];
  numbersYouHave: number[];
}

function arrayToHashMap(array: number[]): { [key: number]: true } {
  const hashMap: { [key: number]: true } = {};
  for (const item of array) {
    hashMap[item] = true;
  }
  return hashMap;
}

function parseData(rawData: string[]): Card[] {
  const results: Card[] = [];
  for (const line of rawData) {
    const card: Card = { winningNumbers: [], numbersYouHave: [] };
    const rmCardNumber = line.split(': ')[1];
    const [winningNumbersString, numbersYouHaveString] =
      rmCardNumber.split(' | ');
    for (let i = 0; i < winningNumbersString.length; i += 3) {
      card.winningNumbers.push(
        +(winningNumbersString[i] + winningNumbersString[i + 1])
      );
    }
    for (let i = 0; i < numbersYouHaveString.length; i += 3) {
      card.numbersYouHave.push(
        +(numbersYouHaveString[i] + numbersYouHaveString[i + 1])
      );
    }
    results.push(card);
  }
  return results;
}
