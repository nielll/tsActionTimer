abstract class StaticTiming {
  static now: Date
}

interface ITimer {}

export default class Timer implements ITimer, StaticTiming {
  public static readonly now: Date = new Date(Date.now())

  constructor() {}

  public static getMsFormated(time) {
    var hours = time / 60 / 60 / 1000
    var minutes = (time - Math.floor(hours) * 3600 * 1000) / 60 / 1000
    var seconds =
      (time -
        Math.floor(hours) * 3600 * 1000 -
        Math.floor(minutes) * 60 * 1000) /
      1000

    return `(${Math.floor(hours)}:${Math.floor(minutes)}:${Math.floor(
      seconds
    )})`
  }

  public static updateTimeDOM(
    id: string,
    autoReturnAt: Date,
    element: HTMLTableRowElement
  ) {
    const now = Timer.now.getTime()
    const autoReturnMs = autoReturnAt.getTime() - now

    const x = setInterval(function () {
      const timeNow = new Date().getTime()
      document.getElementById(id).innerHTML = Timer.getMsFormated(
        autoReturnMs - (timeNow - now)
      )

      // If the count down is finished, click button
      if (autoReturnMs - (timeNow - now) <= 0) {
        clearInterval(x)
        let button: HTMLElement = element.getElementsByClassName(
          'command-cancel'
        )[0] as HTMLElement
        if (button) button.click()
      }
    }, 1000)
  }

  public static correctTimeOffset = (date: Date) => {
    const timeZoneOffset = Timer.now.getTimezoneOffset() * 60 * 1000
    return new Date(date.getTime() - timeZoneOffset)
  }

  public static toString = (): string => {
    const regexDate = /^.*\s/g
    const regexTime = /\s.*$/g
    const matchesDate = this.now.toLocaleString().match(regexDate)
    const matchesTime = this.now.toLocaleString().match(regexTime)

    const [day, month, year] = matchesDate[0].trim().split('.')
    const [hour, minutes, seconds] = matchesTime[0].trim().split(':')

    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`
  }
}
