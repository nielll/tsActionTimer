"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WorkerInterval {
    constructor() {
        this.works = [];
        const Worker = require("worker-loader!./worker");
        this.worker = new Worker();
        this.worker.onmessage = (data) => this.onMessage(data);
    }
    setInterval(callback, delay) {
        const work = {
            id: (Math.random() * 1000).toString(),
            callback,
        };
        this.works.push(work);
        const intervalWork = {
            name: "setInterval",
            id: work.id,
            delay,
        };
        this.worker.postMessage(intervalWork);
        return work.id;
    }
    clearInterval(id) {
        const workIndex = this.works && this.works.findIndex(x => x.id === id);
        if (workIndex === null || workIndex < 0) {
            return;
        }
        const intervalWork = {
            name: "clearInterval",
            id: this.works[workIndex].id,
        };
        this.worker.postMessage(intervalWork);
        this.works.splice(workIndex, 1);
    }
    onMessage(event) {
        const intervalWork = event.data && event.data;
        if (!intervalWork) {
            return;
        }
        switch (intervalWork.name) {
            case "runCallback": {
                const work = this.works && this.works.find(x => x.id === intervalWork.id);
                if (!work) {
                    return;
                }
                work.callback();
                break;
            }
        }
    }
}
exports.default = WorkerInterval;
