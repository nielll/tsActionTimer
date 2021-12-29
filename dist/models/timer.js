"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StaticTiming {
}
class Timer {
    constructor() { }
    static getMsFromString(time) {
        // e.g. 00:15:15
        const regex = /\d+/g;
        const matches = time.match(regex);
        const hour = Number(matches[0]) * 60 * 60 * 1000;
        const minutes = Number(matches[1]) * 60 * 1000;
        const seconds = Number(matches[2]) * 1000;
        return hour + minutes + seconds;
    }
    static getMsFormated(time) {
        var hours = time / 60 / 60 / 1000;
        var minutes = (time - Math.floor(hours) * 3600 * 1000) / 60 / 1000;
        var seconds = (time -
            Math.floor(hours) * 3600 * 1000 -
            Math.floor(minutes) * 60 * 1000) /
            1000;
        return `(${Math.floor(hours)}:${Math.floor(minutes)}:${Math.floor(seconds)})`;
    }
    static updateTimeDOM(timedAction, timerInputElement, timerInputElementValue, actionButtonElement) {
        const now = Timer.now().getTime();
        const timedActionMs = timedAction.getTime() - now;
        const x = setInterval(function () {
            const timeNow = new Date().getTime();
            const regexString = /\(.*\)/;
            timerInputElement.value = timerInputElementValue.replace(regexString, '') + " " + Timer.getMsFormated(timedActionMs - (timeNow - now));
            // If the count down is finished, click button
            if (timedActionMs - (timeNow - now) - 230 <= 0) {
                console.log("Attack at: [ms - now]" + timedActionMs + " [ms]: " + timedAction.getTime());
                timerInputElement.value = timerInputElementValue.replace(regexString, '');
                clearInterval(x);
                if (actionButtonElement)
                    actionButtonElement.click();
            }
        }, 1000);
        return x;
    }
    static generateDateFromString(date) {
        const regex = /\d+/g;
        const matches = date.match(regex);
        const day = Number(matches[0]);
        const month = Number(matches[1]) - 1;
        const year = Number(matches[2]);
        const hours = Number(matches[3]);
        const minutes = Number(matches[4]);
        const seconds = Number(matches[5]);
        const ms = Number(matches[6]) ? Number(matches[6]) : 0;
        return new Date(new Date(year, month, day, hours, minutes, seconds).setMilliseconds(ms));
    }
}
exports.default = Timer;
Timer.now = () => new Date(new Date(Date.now()).setMilliseconds(0));
Timer.correctTimeOffset = (date) => {
    const timeZoneOffset = Timer.now().getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - timeZoneOffset);
};
Timer.toString = () => {
    const regexDate = /^.*\s/g;
    const regexTime = /\s.*$/g;
    const matchesDate = Timer.now.toLocaleString().match(regexDate);
    const matchesTime = Timer.now.toLocaleString().match(regexTime);
    const [day, month, year] = matchesDate[0].trim().split('.');
    const [hour, minutes, seconds] = matchesTime[0].trim().split(':');
    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;
};
