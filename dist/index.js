"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./models/timer");
const attacker_1 = require("./models/attacker");
const backdeff_1 = require("./models/backdeff");
class TsBackTimerLibrary {
    constructor() {
        const container = document.getElementById('commands_outgoings');
        if (!container) {
            alert("Please run on 'game.php?screen=overview_villages&intro'");
        }
        else {
            console.log('tsBackTimer initialized');
            this._container = container;
        }
    }
    static init(tsBackTimer) {
        console.log(`===== Start Initialization: ${timer_1.default.now} =====`);
        const container = tsBackTimer._container;
        const tbody = container.getElementsByTagName('tbody')[0];
        const trs = tbody.getElementsByTagName('tr');
        if (container.getElementsByTagName('button').length > 0)
            return console.error('TsBackTimer already running, please refresh and rerun script!');
        // Create Button
        const btn = document.createElement('button');
        btn.innerHTML = 'Start Backtimer';
        btn.setAttribute('id', 'tsBackTimerActionButton');
        btn.onclick = function () {
            tsBackTimer.execution();
        };
        container.appendChild(btn);
        for (var i = 0; i < trs.length; i++) {
            const tr = trs[i];
            const el = i === 0 ? tr.getElementsByTagName('th') : tr.getElementsByTagName('td');
            let newNode = i === 0 ? document.createElement('th') : document.createElement('td');
            let text = i === 0 ? document.createTextNode('') : document.createTextNode('');
            let childNode = el[0];
            // Create Inputs:Checkbox
            if (text && newNode && childNode) {
                newNode.appendChild(text);
                if (i !== 0) {
                    const newInput = document.createElement('input');
                    newInput.setAttribute('id', `input${i}`);
                    newInput.setAttribute('class', `valid`);
                    newInput.setAttribute('type', 'checkbox');
                    newNode.appendChild(newInput);
                }
                tr.insertBefore(newNode, childNode);
            }
            // Create Inputs:Text => Attacker arrival
            newNode =
                i === 0 ? document.createElement('th') : document.createElement('td');
            text =
                i === 0
                    ? document.createTextNode('Attacker arrival')
                    : document.createTextNode('');
            childNode = el[2];
            if (text && newNode && childNode) {
                newNode.appendChild(text);
                if (i !== 0) {
                    const newInputAttackArr = document.createElement('input');
                    newInputAttackArr.setAttribute('id', `inputAttack${i}`);
                    newInputAttackArr.setAttribute('class', `attack`);
                    newInputAttackArr.setAttribute('type', 'text');
                    newInputAttackArr.placeholder = `${timer_1.default.toString()}:313`;
                    newNode.appendChild(newInputAttackArr);
                }
                tr.insertBefore(newNode, childNode);
            }
            // Create Inputs:Text => Slowest Unit
            newNode =
                i === 0 ? document.createElement('th') : document.createElement('td');
            text =
                i === 0
                    ? document.createTextNode('Slowest Unit')
                    : document.createTextNode('');
            childNode = el[2];
            if (text && newNode && childNode) {
                newNode.appendChild(text);
                if (i !== 0) {
                    const newInputDuration = document.createElement('input');
                    newInputDuration.setAttribute('id', `inputUnit${i}`);
                    newInputDuration.setAttribute('class', `unit`);
                    newInputDuration.setAttribute('type', 'text');
                    newInputDuration.placeholder = '1:05:20';
                    newNode.appendChild(newInputDuration);
                }
                tr.insertBefore(newNode, childNode);
            }
        }
    }
    execution() {
        const tbody = this._container.getElementsByTagName('tbody')[0];
        const trs = tbody.getElementsByTagName('tr');
        if (!confirm('Fire BackTiming?')) {
            console.error(`Stopped!`);
            return location.reload();
        }
        console.log(`===== Start Execution: ${timer_1.default.now} =====`);
        for (var i = 0; i < trs.length; i++) {
            const tr = trs[i];
            let el = i === 0 ? tr.getElementsByTagName('th') : tr.getElementsByTagName('td');
            let newNode = i === 0 ? document.createElement('th') : document.createElement('td');
            let text = i === 0
                ? document.createTextNode('Autoreturn in')
                : document.createTextNode('');
            let childNode = el[4];
            if (text && newNode && childNode) {
                newNode.appendChild(text);
                if (i !== 0)
                    newNode.setAttribute('id', `timer${i}`);
                tr.insertBefore(newNode, childNode);
            }
            if (i !== 0 && tr.getElementsByClassName('valid')[0].checked) {
                const distance = tr.getElementsByClassName('unit')[0].value;
                const attackerTime = tr.getElementsByClassName('attack')[0].value;
                const arrivingAt = tr.getElementsByTagName('td')[5].innerHTML;
                const attacker = new attacker_1.default(attackerTime);
                const backDeffUnit = new backdeff_1.default(distance, arrivingAt, attacker);
                timer_1.default.updateTimeDOM(`timer${i}`, backDeffUnit.autoReturnAt, tr);
            }
        }
    }
}
exports.default = TsBackTimerLibrary;
