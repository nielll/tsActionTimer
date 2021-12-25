"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./models/timer");
class TsAttackTimerLibrary {
    constructor() {
        const container = document.getElementById('popup_box_popup_command');
        if (!container) {
            alert("Please run on 'game.php?screen=overview_villages&intro'");
        }
        else {
            console.log('tsAttackTimer initialized');
            this._container = container;
        }
    }
    static init(tsAttackTimer) {
        console.log(`===== Start Initialization: ${timer_1.default.now} =====`);
        const container = tsAttackTimer._container;
        const tbody = container.getElementsByTagName('tbody')[0];
        const trs = tbody.getElementsByTagName('tr');
        if (container.getElementsByTagName('button').length > 0)
            return console.error('tsAttackTimer already running, please refresh and rerun script!');
        //Append tr
        const tr = document.createElement('tr');
        tr.innerHTML = `
     <td>Timed Attack:</td>
     <td id="date_arrival">
      <input value="${new Date(timer_1.default.now.getTime() + 3600000)}" />
      <span class="relative_time" data-duration="2415">heute um 11:07:22</span>
     </td>
    `;
        tbody.appendChild(tr);
    }
    execution() { }
}
exports.default = TsAttackTimerLibrary;
