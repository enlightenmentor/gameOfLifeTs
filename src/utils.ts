import { setTimeout } from 'node:timers/promises';
import { stdout } from 'node:process';

const range = (length: number) => Array.from(new Array<undefined>(length));

const clearConsole = () =>
    new Promise((resolve) => {
        stdout.cursorTo(0, 0, () =>
            stdout.clearScreenDown(resolve as () => void)
        );
    });

const createRunner = (callback: Function, frameRate: number) => {
    const run = async () => {
        const timeout = setTimeout(frameRate);
        await Promise.all([callback(), timeout]);
        run();
    };

    return { start: run };
};

const createBenchmark = () => {
    let sum = 0;
    let count = 0;
    let max = -Infinity;
    let min = Infinity;

    return <T>(fn: (...args: unknown[]) => T) => {
        const start = performance.now();
        const result = fn();
        const current = performance.now() - start;
        sum += current;
        count++;
        min = Math.min(min, current);
        max = Math.max(max, current);
        return [
            {
                current: parseFloat(current.toFixed(4)),
                calls: count,
                avg: parseFloat((sum / count).toFixed(4)),
                min: parseFloat(min.toFixed(4)),
                max: parseFloat(max.toFixed(4)),
            },
            result,
        ] as const;
    };
};

export { range, createBenchmark, createRunner, clearConsole };
