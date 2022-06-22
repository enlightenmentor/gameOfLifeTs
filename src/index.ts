import { create as createWorld } from './entities/world';
import { createBenchmark, createRunner, clearConsole } from './utils';

const WIDTH = 100;
const HEIGHT = 50;
const FRAME_RATE = 1000 / 20;

const computeBench = createBenchmark();
const renderBench = createBenchmark();

const world = createWorld({ width: WIDTH, height: HEIGHT, aliveRatio: 0.1 });
console.log(world.toString());

const runner = createRunner(FRAME_RATE, () => {
    clearConsole();
    const [computeStats] = computeBench(world.update);
    const [renderStats, worldString] = renderBench(world.toString);
    console.log(worldString);
    console.table({ Compute: computeStats, Render: renderStats });
});

runner.start();
