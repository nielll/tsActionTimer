declare abstract class StaticTiming {
    static now: Date;
}
interface ITimer {
}
export default class Timer implements ITimer, StaticTiming {
    static readonly now: Date;
    constructor();
    static getMsFormated(time: any): string;
    static updateTimeDOM(id: string, autoReturnAt: Date, element: HTMLTableRowElement): void;
    static correctTimeOffset: (date: Date) => Date;
    static toString: () => string;
}
export {};
