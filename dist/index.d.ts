declare global {
    interface Window {
        tsAttackTimer: any;
    }
}
export default class TsAttackTimerLibrary {
    private _container;
    private timedId;
    constructor();
    static init(tsAttackTimer: TsAttackTimerLibrary): void;
    execution: () => void;
}
