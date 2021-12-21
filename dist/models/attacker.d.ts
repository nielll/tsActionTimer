interface IAttacker {
    coordinates?: string;
    arrival: Date;
}
export default class Attacker implements IAttacker {
    readonly arrivalDate: Date;
    readonly coordinates?: string;
    readonly arrival: Date;
    constructor(arrival: string, coordinates?: string);
    private getArrivalDate;
}
export {};
