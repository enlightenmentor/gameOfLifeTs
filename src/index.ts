import { setTimeout } from 'node:timers/promises';
import { create as createWorld } from './entities/world';
import { createBenchmarker, cellsToString, clearConsole } from './utils';

const width = 100;
const height = 50;

const world = createWorld({ width, height });
world.populate(0.25);
console.log(cellsToString(world.cells));

const computeBenchmark = createBenchmarker();
const renderBenchmark = createBenchmarker();

const frameRate = 1000 / 20;
const run = async () => {
    clearConsole();
    const [computeStats] = computeBenchmark(() => world.update());
    const [renderStats] = renderBenchmark(() =>
        console.log(cellsToString(world.cells))
    );
    console.table({ Compute: computeStats, Render: renderStats });
    await setTimeout(frameRate);
    run();
};
run();
