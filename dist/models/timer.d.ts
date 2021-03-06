declare abstract class StaticTiming {
    static now: Date;
}
interface ITimer {
}
export default class Timer implements ITimer, StaticTiming {
    static readonly now: () => Date;
    constructor();
    static getMsFromString(time: string): number;
    static getMsFormated(time: any): string;
    static updateTimeDOM(timedAction: Date, timerInputElement: HTMLInputElement, timerInputElementValue: string, actionButtonElement: HTMLElement): number;
    static generateDateFromString(date: string): Date;
    static correctTimeOffset: (date: Date) => Date;
    static toString: (date?: Date) => string;
}
export {};
