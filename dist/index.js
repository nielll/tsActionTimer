"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./models/timer");
const workerTimers = require("worker-timers");
class TsActionTimerLibrary {
    constructor() {
        this.execution = () => {
            if (this.timedId)
                workerTimers.clearInterval(this.timedId);
            const tbody = this._container.getElementsByTagName('tbody')[0];
            const trs = tbody.getElementsByTagName('tr');
            // Get 'Dauer:' NodeElement
            const xpath = "//td[text()='Dauer:']";
            const matchingDurationElement = document.evaluate(xpath, tbody, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.nextSibling;
            const duration = matchingDurationElement.textContent;
            const timedAction = this._container.getElementsByClassName('timedAction')[0].value;
            const timerElement = this._container.getElementsByClassName('troop_confirm_go')[0];
            const timedActionToDate = new Date(timer_1.default.generateDateFromString(timedAction).getTime() - timer_1.default.getMsFromString(duration));
            const actionButtonElement = this._container.getElementsByClassName('troop_confirm_go')[0];
            if (timer_1.default.now().getTime() > (timer_1.default.generateDateFromString(timedAction).getTime() - timer_1.default.getMsFromString(duration))) {
                alert('Time for attack is already passed!');
                if (this.timedId)
                    workerTimers.clearInterval(this.timedId);
                return;
            }
            this.timedId = timer_1.default.updateTimeDOM(timedActionToDate, timerElement, timerElement.value, actionButtonElement);
        };
        const container = document.getElementById('popup_box_popup_command');
        if (!container || container.classList.contains('initialized')) {
            if (container.classList.contains('initialized'))
                alert('already initialized!');
            else
                alert("Please run on attacking/supporting popup");
        }
        else {
            console.log('tsActionTimer initialized');
            container.classList.add('initialized');
            this._container = container;
        }
    }
    static init(tsActionTimer) {
        const container = tsActionTimer._container;
        const tbody = container.getElementsByTagName('tbody')[0];
        const trs = tbody.getElementsByTagName('tr');
        if (!container || !tbody || !trs)
            return;
        console.log(`===== Start Initialization: ${timer_1.default.now()} =====`);
        if (container.getElementsByTagName('button').length > 0)
            return console.error('tsAttackTimer already running, please refresh and rerun script!');
        //Append tr
        const tr = document.createElement('tr');
        tr.classList.add('timed');
        const time = new Date(timer_1.default.now().getTime() + 3600000);
        tr.innerHTML = `
     <td>Timed:</td>
     <td id="date_arrival">
      <input type="text" class="timedAction" value="${time.getDate()}.${time.getMonth() + 1}.${time.getFullYear()} ${time.getUTCHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}" />
      <button type="button" class="btn setTimedAction">Set Timing</button>
     </td>
    `;
        tbody.appendChild(tr);
        tbody.getElementsByClassName('setTimedAction')[0].onclick = function (e) {
            e.preventDefault();
            tsActionTimer.execution();
            tsActionTimer.requestTime();
        };
    }
    requestTime() {
        let startTime = (new Date()).getTime(), endTime;
        const callback = () => {
            const delayTd = document.createElement('td');
            delayTd.innerHTML = (endTime - startTime) + "ms";
            const timedTr = this._container.getElementsByClassName('timed')[0];
            timedTr.appendChild(delayTd);
            console.log('Took ' + (endTime - startTime) + 'ms', startTime, endTime);
        };
        this.callAjax('https://www.die-staemme.de/page/rules', callback);
    }
    callAjax(url, callback) {
        let xmlhttp;
        // compatible with IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                callback(xmlhttp.responseText);
            }
        };
        xmlhttp.open("HEAD", url, true);
        xmlhttp.send();
    }
}
exports.default = TsActionTimerLibrary;
