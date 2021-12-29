declare global {
    interface Window {
        tsAttackTimer: any;
    }
}
export default class TsActionTimerLibrary {
    private _container;
    private timedId;
    constructor();
    static init(tsAttackTimer: TsActionTimerLibrary): void;
    execution: () => void;
}
