"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./timer");
class BackDeff {
    constructor(duration, arrival, attacker) {
        this.attacker = attacker;
        this.arrival = this.generateTimeFromString(arrival);
        this.duration = duration;
        this.durationMs = this.getDurationMs(duration);
        this.departure = this.getDeparture(duration);
        this.autoReturnAt = this.getAutoReturnAt();
        console.log('arrival', arrival);
    }
    getDurationMs(duration) {
        return this.generateMsFromRegex(duration);
    }
    getDeparture(duration) {
        return new Date(this.arrival.getTime() - this.getDurationMs(duration));
    }
    generateMsFromRegex(time) {
        const regex = /\d+/g;
        const matches = time.match(regex);
        const hours = Number(matches[0]) * 60 * 60 * 1000;
        const minutes = Number(matches[1]) * 60 * 1000;
        const seconds = Number(matches[2]) * 1000;
        const ms = Number(matches[3]) ? Number(matches[3]) : 0;
        return hours + minutes + seconds + ms;
    }
    getAutoReturnAt() {
        return new Date(this.departure.getTime() +
            (this.attacker.arrival.getTime() - this.departure.getTime()) / 2);
    }
    generateTimeFromString(date) {
        const regex = /\d+/g;
        const matches = date.match(regex);
        const hours = Number(matches[0]);
        const minutes = Number(matches[1]);
        const seconds = Number(matches[2]);
        const ms = Number(matches[3]) ? Number(matches[3]) : 0;
        return new Date(new Date(timer_1.default.now.getFullYear(), timer_1.default.now.getMonth(), timer_1.default.now.getDate(), hours, minutes, seconds).setMilliseconds(ms));
    }
    generateDateFromString(date) {
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
exports.default = BackDeff;
