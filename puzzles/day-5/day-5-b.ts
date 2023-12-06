import { readData } from '../../shared.ts';
import chalk from 'chalk';

export async function day5b(dataPath?: string) {
  const data = await readData(dataPath);
  const mapData = parseData(data);
  // console.log(JSON.stringify(mapData, null, 2));
  // console.log(mapData);
  let done = false;
  let targetLocation = 0;
  while (done === false) {
    let currentLocation = targetLocation;
    for (
      let instructionSetIndex = mapData.instructions.length;
      instructionSetIndex--;
      instructionSetIndex >= 0
    ) {
      const instructionSet = mapData.instructions[instructionSetIndex];
      // console.log(instructionSetIndex);
      // if (instructionSetIndex === mapData.instructions.length - 1) {
      //   console.log(JSON.stringify(instructionSet, null, 2));
      // }
      for (const instruction of instructionSet) {
        if (
          currentLocation >= instruction.destinationStart &&
          currentLocation < instruction.destinationStart + instruction.range
        ) {
          currentLocation =
            instruction.sourceStart +
            (currentLocation - instruction.destinationStart);
          break;
        }
      }
      // debug.push(currentLocation);
    }
    // console.log(debug);
    // console.log(
    //   `target location: ${targetLocation} | seed: ${currentLocation}`
    // );
    for (const seedData of mapData.seeds) {
      if (
        currentLocation >= seedData.start &&
        currentLocation < seedData.start + seedData.range
      ) {
        console.log(`matches ${seedData.start} | ${seedData.range}`);
        return targetLocation;
      }
    }
    targetLocation++;
  }
}

const answer = await day5b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface MapData {
  seeds: { start: number; range: number }[];
  instructions: Instruction[][];
}

interface Instruction {
  destinationStart: number;
  sourceStart: number;
  range: number;
}

function parseData(rawData: string[]): MapData {
  const rawSeedData = rawData[0].split(': ')[1].split(' ');
  const seeds: { start: number; range: number }[] = [];
  for (let i = 0; i < rawSeedData.length; i += 2) {
    seeds.push({
      start: +rawSeedData[i],
      range: +rawSeedData[i + 1],
    });
  }
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
