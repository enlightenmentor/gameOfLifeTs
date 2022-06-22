import { create as createWorld } from './entities/world';
import { createBenchmark, createRunner, clearConsole } from './utils';

const WIDTH = 100;
const HEIGHT = 60;
const FRAME_RATE = 1000 / 20;

const computeBench = createBenchmark();
const renderBench = createBenchmark();

const world = createWorld({ width: WIDTH, height: HEIGHT, aliveRatio: 0.2 });

const runner = createRunner(async () => {
    const [computeStats] = computeBench(world.update);
    const [renderStats, worldString] = renderBench(world.toString);
    await clearConsole();
    console.log(worldString);
    console.table({ Compute: computeStats, Render: renderStats });
}, FRAME_RATE);

runner.start();
