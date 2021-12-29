export default class Unit {
 private units: string[] = [""]
 private unit

 constructor(unit: string) {
  if (this.units.some(m => m === unit)) {
   this.unit = unit
  } else {
   console.log()
  }
 }


}