import Timer from './models/timer'

declare global {
  interface Window {
    tsAttackTimer: any
  }
}

export default class TsAttackTimerLibrary {
  private _container: HTMLElement
  private timedId: NodeJS.Timeout

  constructor() {
    const container = document.getElementById('popup_box_popup_command')

    if (!container || container.classList.contains('initialized')) {
      if (container.classList.contains('initialized')) alert('already initialized!')
      else alert("Please run on attacking/supporting popup")
    } else {
      console.log('tsAttackTimer initialized')
      container.classList.add('initialized');
      this._container = container
    }
  }

  public static init(tsAttackTimer: TsAttackTimerLibrary) {
   const container = tsAttackTimer._container
   const tbody = container.getElementsByTagName('tbody')[0]
   const trs = tbody.getElementsByTagName('tr')
   
   if (!container || !tbody || !trs) return
   console.log(`===== Start Initialization: ${Timer.now} =====`)

    if (container.getElementsByTagName('button').length > 0)
      return console.error(
        'tsAttackTimer already running, please refresh and rerun script!'
      )

    //Append tr
    const tr = document.createElement('tr');
    const time = new Date(Timer.now.getTime() + 3600000);
    tr.innerHTML = `
     <td>Timed:</td>
     <td id="date_arrival">
      <input type="text" class="timedAction" value="${time.getDate()}.${time.getMonth()+1}.${time.getFullYear()} ${time.getUTCHours()}:${time.getMinutes()}:${time.getSeconds()}:${time.getMilliseconds()}" />
      <button type="button" class="btn setTimedAction">Set Timing</button>
     </td>
     <script>
     $("#command-data-form").submit(function(event){ 
      event.preventDefault(); 
     }); 
     </script>
    `
    tbody.appendChild(tr);

    (tbody.getElementsByClassName('setTimedAction')[0] as HTMLButtonElement).onclick = function(e){
     e.preventDefault();
     tsAttackTimer.execution();
    }
  }

  public execution = () => {
   if (this.timedId) clearInterval(this.timedId)
   const tbody = this._container.getElementsByTagName('tbody')[0]
   const trs = tbody.getElementsByTagName('tr')

   const duration = trs[2].innerHTML
   const timedAction: string = (this._container.getElementsByClassName('timedAction')[0] as HTMLInputElement).value
   const timerElement: HTMLInputElement = this._container.getElementsByClassName('troop_confirm_go')[0] as HTMLInputElement
   const timedActionToDate: Date = new Date(Timer.generateDateFromString(timedAction).getTime() - Timer.getMsFromString(duration))
   const actionButtonElement: HTMLElement = this._container.getElementsByClassName('troop_confirm_go')[0] as HTMLElement

   if (Timer.now.getTime() > (Timer.generateDateFromString(timedAction).getTime()- Timer.getMsFromString(duration))) {
    alert('Time for attack is already passed!')
    if (this.timedId) clearInterval(this.timedId)
    return
   }

   this.timedId = Timer.updateTimeDOM(timedActionToDate, timerElement, timerElement.value, actionButtonElement)
  }
}
