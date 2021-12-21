"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
class StaticTiming {
}
class Timer {
    constructor() { }
    static getMsFormated(time) {
        var hours = time / 60 / 60 / 1000;
        var minutes = (time - Math.floor(hours) * 3600 * 1000) / 60 / 1000;
        var seconds = (time -
            Math.floor(hours) * 3600 * 1000 -
            Math.floor(minutes) * 60 * 1000) /
            1000;
        return `(${Math.floor(hours)}:${Math.floor(minutes)}:${Math.floor(seconds)})`;
    }
    static updateTimeDOM(id, autoReturnAt, element) {
        const now = Timer.now.getTime();
        const autoReturnMs = autoReturnAt.getTime() - now;
        const x = setInterval(function () {
            const timeNow = new Date().getTime();
            document.getElementById(id).innerHTML = Timer.getMsFormated(autoReturnMs - (timeNow - now));
            // If the count down is finished, click button
            if (autoReturnMs - (timeNow - now) <= 0) {
                clearInterval(x);
                let button = element.getElementsByClassName('command-cancel')[0];
                if (button)
                    button.click();
            }
        }, 1000);
    }
}
exports.default = Timer;
_a = Timer;
Timer.now = new Date(Date.now());
Timer.correctTimeOffset = (date) => {
    const timeZoneOffset = Timer.now.getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - timeZoneOffset);
};
Timer.toString = () => {
    const regexDate = /^.*\s/g;
    const regexTime = /\s.*$/g;
    const matchesDate = _a.now.toLocaleString().match(regexDate);
    const matchesTime = _a.now.toLocaleString().match(regexTime);
    const [day, month, year] = matchesDate[0].trim().split('.');
    const [hour, minutes, seconds] = matchesTime[0].trim().split(':');
    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;
};
