"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Unit {
    constructor(unit) {
        this.units = [""];
        if (this.units.some(m => m === unit)) {
            this.unit = unit;
        }
        else {
            console.log();
        }
    }
}
exports.default = Unit;
