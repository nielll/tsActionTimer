declare global {
    interface Window {
        tsActionTimer: any;
    }
}
export default class TsActionTimerLibrary {
    private _container;
    private timedId;
    constructor();
    static init(tsActionTimer: TsActionTimerLibrary): void;
    execution: () => void;
    requestTime(): void;
    private callAjax;
}
