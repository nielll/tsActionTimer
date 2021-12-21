import Timer from './timer'

interface IAttacker {
  coordinates?: string
  arrival: Date
}

export default class Attacker implements IAttacker {
  public readonly arrivalDate: Date
  public readonly coordinates?: string
  public readonly arrival: Date

  constructor(arrival: string, coordinates?: string) {
    this.arrival = this.getArrivalDate(arrival)
    this.coordinates = coordinates
  }

  private getArrivalDate = (date: string) => {
    if (!date) return
    const regexDate = /^.*\s/g
    const regexTime = /\s.*$/g
    const matchesDate = date.replace(',', '').match(regexDate)
    const matchesTime = date.replace(',', '').match(regexTime)

    const attackerDateArr = matchesDate[0].trim().split('.')
    const attackTimeArr = matchesTime[0].trim().split(':')

    return new Date(
      new Date(
        Number(attackerDateArr[2]),
        Number(attackerDateArr[1]) - 1,
        Number(attackerDateArr[0]),
        Number(attackTimeArr[0]),
        Number(attackTimeArr[1]),
        Number(attackTimeArr[2])
      ).setMilliseconds(Number(attackTimeArr[3]))
    )
  }
}
