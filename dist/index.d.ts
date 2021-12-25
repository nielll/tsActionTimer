declare global {
    interface Window {
        tsAttackTimer: any;
    }
}
export default class TsAttackTimerLibrary {
    private _container;
    constructor();
    static init(tsAttackTimer: TsAttackTimerLibrary): void;
    private execution;
}
