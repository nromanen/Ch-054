export class Action {
    id: number;
    name: string;
    startTime: string;
    endTime: Date;
    date: Date;

    constructor(name, startTime, endTime, date, id?) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.date = date;
    }
}
