import { parseLine, readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2a(dataPath?: string) {
  const data = await readData(dataPath);
  console.log(data);
  const parsedData = data.map(parseLine);
  console.log(parsedData);
  let answer = 0;
  outerLoop: for (const line of parsedData) {
    setLoop: for (const set of line.sets) {
      const limits = cubeLimit();
      for (const cube of set) {
        limits[cube.color] -= cube.count;
        if (limits[cube.color] < 0) {
          console.log(line, false);
          continue outerLoop;
        }
      }
    }
    console.log(line, true);
    answer += line.id;
    console.log(``);
  }
  return answer;
}

const cubeLimit = () => ({
  blue: 14,
  red: 12,
  green: 13,
});

const answer = await day2a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
