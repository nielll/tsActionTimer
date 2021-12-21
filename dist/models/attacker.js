"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attacker {
    constructor(arrival, coordinates) {
        this.getArrivalDate = (date) => {
            if (!date)
                return;
            const regexDate = /^.*\s/g;
            const regexTime = /\s.*$/g;
            const matchesDate = date.replace(',', '').match(regexDate);
            const matchesTime = date.replace(',', '').match(regexTime);
            const attackerDateArr = matchesDate[0].trim().split('.');
            const attackTimeArr = matchesTime[0].trim().split(':');
            return new Date(new Date(Number(attackerDateArr[2]), Number(attackerDateArr[1]) - 1, Number(attackerDateArr[0]), Number(attackTimeArr[0]), Number(attackTimeArr[1]), Number(attackTimeArr[2])).setMilliseconds(Number(attackTimeArr[3])));
        };
        this.arrival = this.getArrivalDate(arrival);
        this.coordinates = coordinates;
    }
}
exports.default = Attacker;
