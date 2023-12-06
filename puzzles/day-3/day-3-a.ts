import { readData } from '../../shared.ts';
import chalk from 'chalk';

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export async function day3a(dataPath?: string) {
  const data = await readData(dataPath);
  const mapData = parseData(data);
  console.log(mapData);
  const parts: number[] = [];
  for (const number of mapData.numbers) {
    for (const location of number.locations) {
      if (
        mapData.symbols.some(
          (s) =>
            (s.x === location.x ||
              s.x === location.x - 1 ||
              s.x === location.x + 1) &&
            (s.y === location.y ||
              s.y === location.y - 1 ||
              s.y === location.y + 1)
        )
      ) {
        parts.push(number.number);
        break;
      }
    }
  }
  return parts.reduce((a, b) => a + b, 0);
}

const answer = await day3a();
console.log(chalk.bgGreen('Your Answer:'), chalk.green(answer));

interface MapData {
  numbers: { number: number; locations: Location[] }[];
  symbols: Location[];
}

interface Location {
  x: number;
  y: number;
}

function parseData(rawData: string[]): MapData {
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
      mapData.symbols.push({ y: i, x: j });
      currentNumber = createCurrentNumber();
    }
  }
  return mapData;
}
