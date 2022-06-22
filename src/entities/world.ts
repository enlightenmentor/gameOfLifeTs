import { spawnCells, getNextStatus } from './cell';

const create = ({ width, height, aliveRatio = 0 }: WorldParams): World => {
    const state: WorldState = {
        width,
        height,
        age: 0,
        cells: spawnCells(width, height, aliveRatio),
    };

    return {
        width: state.width,
        height: state.height,
        get age() {
            return state.age;
        },
        get cells() {
            return state.cells;
        },
        update() {
            const nextCells = spawnCells(width, height);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    nextCells[y][x] = getNextStatus({ x, y }, state.cells);
                }
            }
            state.cells = nextCells;
            state.age++;
        },
        toString() {
            return state.cells
                .map((cellsRow) =>
                    cellsRow.map((cell) => (cell ? '[]' : '  ')).join('')
                )
                .join('\n');
        },
    };
};

type WorldState = {
    readonly width: number;
    readonly height: number;
    age: number;
    cells: number[][];
};

type WorldParams = Readonly<{
    width: number;
    height: number;
    aliveRatio?: number;
}>;

interface World {
    readonly width: number;
    readonly height: number;
    get age(): number;
    get cells(): number[][];
    update(): void;
    toString(): string;
}

export { create };
export type { World, WorldState };
