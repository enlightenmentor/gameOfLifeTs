import {
    createDeadCells,
    getAliveNeighboursCount,
    getCellStatus,
} from './cell';

const create = ({ width, height }: WorldParams): World => {
    const state: WorldState = {
        width,
        height,
        age: 0,
        cells: createDeadCells(width, height),
    };

    return {
        get width() {
            return width;
        },
        get height() {
            return height;
        },
        get age() {
            return state.age;
        },
        get cells() {
            return state.cells;
        },
        populate(ratio: number) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const isAlive = Math.random() < ratio;
                    state.cells[y][x] = Number(isAlive);
                }
            }
        },
        update() {
            const nextCells = createDeadCells(width, height);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const aliveNeighboursCount = getAliveNeighboursCount(
                        { x, y },
                        state.cells
                    );
                    const isAlive = getCellStatus(
                        state.cells[y][x],
                        aliveNeighboursCount
                    );
                    nextCells[y][x] = Number(isAlive);
                }
            }
            state.cells = nextCells;
            state.age++;
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
}>;

interface World {
    get width(): number;
    get height(): number;
    get age(): number;
    get cells(): number[][];
    populate(ratio: number): void;
    update(): void;
}

export { create };
export type { World, WorldState };
