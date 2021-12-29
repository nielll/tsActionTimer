"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setInterval = exports.clearInterval = exports.workerInterval = void 0;
const workerInterval_1 = require("./workerInterval");
exports.workerInterval = new workerInterval_1.default();
const clearInterval = (id) => exports.workerInterval.clearInterval(id);
exports.clearInterval = clearInterval;
const setInterval = (callback, delay) => exports.workerInterval.setInterval(callback, delay);
exports.setInterval = setInterval;
