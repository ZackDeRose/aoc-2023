import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day4b(dataPath?: string) {
  const data = await readData(dataPath);
  const cards = parseData(data);
  console.log(cards);
  const cardCounts: number[] = [1];
  for (let i = 1; i < cards.length; i++) {
    cardCounts.push(1);
  }
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const multiplier = cardCounts[i];
    const numbersYouHaveHashMap = arrayToHashMap(card.numbersYouHave);
    let matches = 0;
    for (const winningNumber of card.winningNumbers) {
      if (numbersYouHaveHashMap[winningNumber]) {
        matches++;
      }
    }
    for (let j = 0; j < matches; j++) {
      cardCounts[i + j + 1] += multiplier;
    }
  }
  return cardCounts.reduce((a, b) => a + b, 0);
}

const answer = await day4b();
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
