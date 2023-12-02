import { readFile } from 'fs/promises';

export async function readData(path?: string) {
  const fileName = path || process.argv[2];
  const data = (await readFile(fileName)).toString().split('\n');
  return data;
}

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export function getnumber(line: string): number {
  const numbersInLine: string[] = [];
  for (const char of line) {
    if (digits.includes(char)) {
      numbersInLine.push(char);
    }
  }
  return numbersInLine.length === 1
    ? parseInt([numbersInLine[0], numbersInLine[0]].join(''))
    : parseInt(
        numbersInLine
          .filter((_, i) => i === 0 || i === numbersInLine.length - 1)
          .join('')
      );
}

interface LineData {
  id: number;
  sets: CubeSet[][];
}

interface CubeSet {
  color: 'blue' | 'red' | 'green';
  count: number;
}

export function parseLine(line: string): LineData {
  const [gameId, setsData] = line.split(': ');
  const id = parseInt(gameId.split(' ')[1]);
  const setsStrings = setsData.split('; ');
  const sets: CubeSet[][] = [];
  for (const setString of setsStrings) {
    const cubesString = setString.split(', ');
    const cubes: CubeSet[] = [];
    for (const cube of cubesString) {
      const [count, color] = cube.split(' ') as [
        string,
        'blue' | 'red' | 'green'
      ];
      cubes.push({ color, count: parseInt(count) });
    }
    sets.push(cubes);
  }
  return { id, sets };
}
