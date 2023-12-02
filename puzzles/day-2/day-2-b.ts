import { parseLine, readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day2b(dataPath?: string) {
  const data = await readData(dataPath);
  console.log(data);
  const parsedData = data.map(parseLine);
  console.log(parsedData);
  let answer = 0;
  for (const line of parsedData) {
    const maxes = { blue: 0, green: 0, red: 0 };
    for (const set of line.sets) {
      const curr = { blue: 0, green: 0, red: 0 };
      for (const cube of set) {
        curr[cube.color] += cube.count;
        if (curr[cube.color] > maxes[cube.color]) {
          maxes[cube.color] = curr[cube.color];
        }
      }
    }
    answer += maxes.blue * maxes.green * maxes.red;
  }
  return answer;
}

const answer = await day2b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));
