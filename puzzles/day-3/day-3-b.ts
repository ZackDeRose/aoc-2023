import { readData } from '../../shared.ts';
import chalk from 'chalk';

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export async function day3b(dataPath?: string) {
  const data = await readData(dataPath);
  const mapData = parseData(data);
  console.log(mapData);
  const gearRatios: number[] = [];
  for (const symbol of mapData.symbols) {
    if (symbol.symbol === '*') {
      const adjacentNumbers: number[] = [];
      for (const number of mapData.numbers) {
        for (const location of number.locations) {
          if (
            Math.abs(location.x - symbol.location.x) <= 1 &&
            Math.abs(location.y - symbol.location.y) <= 1
          ) {
            adjacentNumbers.push(number.number);
            break;
          }
        }
      }
      if (adjacentNumbers.length === 2) {
        gearRatios.push(adjacentNumbers[0] * adjacentNumbers[1]);
      }
    }
  }
  return gearRatios.reduce((a, b) => a + b, 0);
}

const answer = await day3b();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface MapData {
  numbers: { number: number; locations: Location[] }[];
  symbols: { symbol: string; location: Location }[];
}

interface Location {
  x: number;
  y: number;
}

function parseData(rawData: string[]): MapData {
  console.log(rawData);
  const mapData: MapData = { numbers: [], symbols: [] };
  const createCurrentNumber = () => ({ digits: [], locations: [] });
  let currentNumber: { digits: string[]; locations: Location[] } =
    createCurrentNumber();
  for (let i = 0; i < rawData.length; i++) {
    for (let j = 0; j < rawData[i].length; j++) {
      if (rawData[i][j] === '.') {
        if (currentNumber.digits.length !== 0) {
          mapData.numbers.push({
            number: +currentNumber.digits.join(''),
            locations: currentNumber.locations,
          });
        }
        currentNumber = createCurrentNumber();
        continue;
      }
      if (digits.includes(rawData[i][j])) {
        currentNumber.digits.push(rawData[i][j]);
        currentNumber.locations.push({ y: i, x: j });
        continue;
      }
      if (currentNumber.digits.length !== 0) {
        mapData.numbers.push({
          number: +currentNumber.digits.join(''),
          locations: currentNumber.locations,
        });
      }
      mapData.symbols.push({ location: { y: i, x: j }, symbol: rawData[i][j] });
      currentNumber = createCurrentNumber();
    }
  }
  return mapData;
}
