import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day6b(dataPath?: string) {
  const data = await readData(dataPath);
  const raceData = parseData(data);
  let firstTimeToBeatRecord;
  let curr = 0;
  while (true) {
    const speed = curr;
    const time = raceData.time - curr;
    const distance = speed * time;
    if (distance > raceData.record) {
      firstTimeToBeatRecord = curr;
      break;
    }
    curr++;
  }
  let lastTimeToBeatRecord;
  let lastSpeed = raceData.time;
  while (true) {
    const speed = lastSpeed;
    const time = raceData.time - lastSpeed;
    const distance = speed * time;
    if (distance > raceData.record) {
      lastTimeToBeatRecord = lastSpeed;
      break;
    }
    lastSpeed--;
  }
  console.log(firstTimeToBeatRecord, lastTimeToBeatRecord);
  return lastTimeToBeatRecord - firstTimeToBeatRecord + 1;
}

const answer = await day6b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface RaceData {
  time: number;
  record: number;
}

function parseData(data: string[]): RaceData {
  const timesString = data[0].split('Time:      ')[1];
  const timesCharacters: string[] = [];
  for (let i = 0; i < timesString.length; i++) {
    if (timesString[i] === ' ') {
      continue;
    }
    timesCharacters.push(timesString[i]);
  }
  const recordsString = data[1].split('Distance:  ')[1];
  const recordsCharacters: string[] = [];
  for (let i = 0; i < recordsString.length; i++) {
    if (recordsString[i] === ' ') {
      continue;
    }
    recordsCharacters.push(recordsString[i]);
  }
  return {
    time: Number(timesCharacters.join('')),
    record: Number(recordsCharacters.join('')),
  };
}
