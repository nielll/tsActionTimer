import Timer from './timer'
import Attacker from './attacker'

interface IBackDeff {
  readonly autoReturnAt: Date
  readonly departure: Date
  readonly durationMs: number
  readonly domElement: HTMLTableElement
  readonly duration: string
}

export default class BackDeff implements IBackDeff {
  private readonly attacker: Attacker
  public readonly autoReturnAt: Date
  public readonly departure: Date
  public readonly durationMs: number
  public readonly domElement: HTMLTableElement
  public readonly duration: string
  public readonly arrival: Date

  constructor(duration: string, arrival: string, attacker: Attacker) {
    this.attacker = attacker
    this.arrival = this.generateTimeFromString(arrival)
    this.duration = duration

    this.durationMs = this.getDurationMs(duration)
    this.departure = this.getDeparture(duration)
    this.autoReturnAt = this.getAutoReturnAt()
    console.log('arrival', arrival)
  }

  private getDurationMs(duration: string): number {
    return this.generateMsFromRegex(duration)
  }

  private getDeparture(duration: string): Date {
    return new Date(this.arrival.getTime() - this.getDurationMs(duration))
  }

  private generateMsFromRegex(time: string) {
    const regex = /\d+/g
    const matches = time.match(regex)

    const hours = Number(matches[0]) * 60 * 60 * 1000
    const minutes = Number(matches[1]) * 60 * 1000
    const seconds = Number(matches[2]) * 1000
    const ms = Number(matches[3]) ? Number(matches[3]) : 0

    return hours + minutes + seconds + ms
  }

  private getAutoReturnAt() {
    return new Date(
      this.departure.getTime() +
        (this.attacker.arrival.getTime() - this.departure.getTime()) / 2
    )
  }

  private generateTimeFromString(date: string): Date {
    const regex = /\d+/g
    const matches = date.match(regex)

    const hours = Number(matches[0])
    const minutes = Number(matches[1])
    const seconds = Number(matches[2])
    const ms = Number(matches[3]) ? Number(matches[3]) : 0

    return new Date(
      new Date(
        Timer.now.getFullYear(),
        Timer.now.getMonth(),
        Timer.now.getDate(),
        hours,
        minutes,
        seconds
      ).setMilliseconds(ms)
    )
  }

  private generateDateFromString(date: string): Date {
    const regex = /\d+/g
    const matches = date.match(regex)

    const day = Number(matches[0])
    const month = Number(matches[1]) - 1
    const year = Number(matches[2])

    const hours = Number(matches[3])
    const minutes = Number(matches[4])
    const seconds = Number(matches[5])
    const ms = Number(matches[6]) ? Number(matches[6]) : 0

    return new Date(
      new Date(year, month, day, hours, minutes, seconds).setMilliseconds(ms)
    )
  }
}
