import { range } from '../utils';

const NEIGBOUR_DIRECTIONS: CellAddress[] = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
];

const createDeadCells = (width: number, height: number) =>
    range(height).map(() => range(width).map(() => 0));

const normalizeIndex = (length: number, i: number) =>
    i < 0 ? length + i : i >= length ? i - length : i;

const getAliveNeighboursCount = (address: CellAddress, cells: number[][]) => {
    const width = cells[0].length;
    const height = cells.length;

    return NEIGBOUR_DIRECTIONS.reduce((count, direction) => {
        const x = normalizeIndex(width, address.x + direction.x);
        const y = normalizeIndex(height, address.y + direction.y);
        return count + cells[y][x];
    }, 0);
};

const getCellStatus = (isAlive: number, aliveNeighboursCount: number) =>
    isAlive
        ? aliveNeighboursCount >= 2 && aliveNeighboursCount <= 3
        : aliveNeighboursCount === 3;

type CellAddress = {
    x: number;
    y: number;
};

export { createDeadCells, getAliveNeighboursCount, getCellStatus };
export type { CellAddress };
