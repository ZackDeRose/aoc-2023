import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6a(dataPath?: string) {
  const data = await readData(dataPath);
  const raceData = parseData(data);
  console.log(raceData);
  let results: number[] = [];
  for (const race of raceData) {
    let recordBeaterCount = 0;
    for (let i = 0; i < race.time; i++) {
      const speed = i;
      const time = race.time - i;
      const distance = speed * time;
      if (distance > race.record) {
        recordBeaterCount++;
      }
    }
    results.push(recordBeaterCount);
  }
  return results.reduce((a, b) => a * b, 1);
}

const answer = await day6a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface RaceData {
  time: number;
  record: number;
}

function parseData(data: string[]): RaceData[] {
  let raceData: RaceData[] = [];
  const timesString = data[0].split('Time:      ')[1];
  const times: number[] = [];
  let currentNumber: string[] = [];
  for (let i = 0; i < timesString.length; i++) {
    if (timesString[i] === ' ') {
      if (currentNumber.length === 0) {
        continue;
      }
      times.push(Number(currentNumber.join('')));
      currentNumber = [];
      continue;
    }
    currentNumber.push(timesString[i]);
  }
  times.push(Number(currentNumber.join('')));
  const recordsString = data[1].split('Distance:  ')[1];
  const records: number[] = [];
  let currentRecord: string[] = [];
  for (let i = 0; i < recordsString.length; i++) {
    if (recordsString[i] === ' ') {
      if (currentRecord.length === 0) {
        continue;
      }
      records.push(Number(currentRecord.join('')));
      currentRecord = [];
      continue;
    }
    currentRecord.push(recordsString[i]);
  }
  records.push(Number(currentRecord.join('')));
  for (let i = 0; i < times.length; i++) {
    raceData.push({
      time: times[i],
      record: records[i],
    });
  }
  return raceData;
}
