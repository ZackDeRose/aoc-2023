import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5a(dataPath?: string) {
  const data = await readData(dataPath);
  const mapData = parseData(data);
  console.log(JSON.stringify(mapData, null, 2));
  let minLocation: number;
  for (const seed of mapData.seeds) {
    let currentLocation = seed;
    const debug = [seed];
    for (const instructionSet of mapData.instructions) {
      for (const instruction of instructionSet) {
        if (
          currentLocation >= instruction.sourceStart &&
          currentLocation < instruction.sourceStart + instruction.range
        ) {
          currentLocation =
            instruction.destinationStart +
            currentLocation -
            instruction.sourceStart;
          break;
        }
      }
      debug.push(currentLocation);
    }
    console.log(debug);
    if (minLocation === undefined || currentLocation < minLocation) {
      minLocation = currentLocation;
    }
  }
  return minLocation;
}

const answer = await day5a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface MapData {
  seeds: number[];
  instructions: Instruction[][];
}

interface Instruction {
  destinationStart: number;
  sourceStart: number;
  range: number;
}

function parseData(rawData: string[]): MapData {
  const seeds = rawData[0]
    .split(': ')[1]
    .split(' ')
    .map((s) => +s);
  const instructions: Instruction[][] = [];
  let currentInstructionSet: Instruction[] = [];
  for (let i = 1; i < rawData.length; i++) {
    if (rawData[i] === '') {
      continue;
    }
    if (rawData[i].split(' ')[1] === 'map:') {
      if (currentInstructionSet.length !== 0) {
        instructions.push(currentInstructionSet);
      }
      currentInstructionSet = [];
      continue;
    }
    currentInstructionSet.push({
      destinationStart: +rawData[i].split(' ')[0],
      sourceStart: +rawData[i].split(' ')[1],
      range: +rawData[i].split(' ')[2],
    });
  }
  return { seeds, instructions };
}
