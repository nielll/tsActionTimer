import WorkerInterval from "./workerInterval";
export declare const workerInterval: WorkerInterval;
export declare const clearInterval: (id: string) => void;
export declare const setInterval: (callback: () => void, delay: number) => string | null;
