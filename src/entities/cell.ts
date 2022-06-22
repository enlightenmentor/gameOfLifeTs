import { range } from '../utils';

const CELL_NEIGHBOURS: CellAddress[] = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 },
];

const spawnCells = (width: number, height: number, ratio: number = 0) =>
    range(height).map(() => range(width).map(() => +(Math.random() < ratio)));

const normalizeIndex = (length: number, i: number) =>
    i < 0 ? length + i : i >= length ? i - length : i;

const getAliveNeighbours = (address: CellAddress, cells: number[][]) => {
    const width = cells[0].length;
    const height = cells.length;

    return CELL_NEIGHBOURS.reduce((count, direction) => {
        const x = normalizeIndex(width, address.x + direction.x);
        const y = normalizeIndex(height, address.y + direction.y);
        return count + cells[y][x];
    }, 0);
};

const getNextStatus = ({ x, y }: CellAddress, cells: number[][]) => {
    const aliveNeighbours = getAliveNeighbours({ x, y }, cells);
    const status = cells[y][x];
    return +(status
        ? aliveNeighbours >= 2 && aliveNeighbours <= 3
        : aliveNeighbours === 3);
};

type CellAddress = {
    x: number;
    y: number;
};

enum CellStatus {
    Alive = 1,
    Dead = 0,
}

export { spawnCells, getNextStatus };
export type { CellStatus };
