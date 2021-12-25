import Timer from './models/timer'
import Attacker from './models/attacker'
import BackDeff from './models/backdeff'

declare global {
  interface Window {
    tsAttackTimer: any
  }
}

export default class TsAttackTimerLibrary {
  private _container

  constructor() {
    const container = document.getElementById('popup_box_popup_command')

    if (!container) {
      alert("Please run on 'game.php?screen=overview_villages&intro'")
    } else {
      console.log('tsAttackTimer initialized')

      this._container = container
    }
  }

  public static init(tsAttackTimer: TsAttackTimerLibrary) {
    console.log(`===== Start Initialization: ${Timer.now} =====`)
    const container = tsAttackTimer._container
    const tbody = container.getElementsByTagName('tbody')[0]
    const trs = tbody.getElementsByTagName('tr')

    if (container.getElementsByTagName('button').length > 0)
      return console.error(
        'tsAttackTimer already running, please refresh and rerun script!'
      )

    //Append tr
    const tr = document.createElement('tr');
    tr.innerHTML = `
     <td>Timed Attack:</td>
     <td id="date_arrival">
      <input value="${new Date(Timer.now.getTime() + 3600000)}" />
      <span class="relative_time" data-duration="2415">heute um 11:07:22</span>
     </td>
    `

    tbody.appendChild(tr);
  }

  private execution() {}
}
