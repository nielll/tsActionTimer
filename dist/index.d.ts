declare global {
    interface Window {
        tsBackTimer: any;
    }
}
export default class TsBackTimerLibrary {
    private _container;
    constructor();
    static init(tsBackTimer: TsBackTimerLibrary): void;
    private execution;
}
