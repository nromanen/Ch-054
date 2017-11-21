import { Action } from './action';

export class Report extends Action {
    id: number;
    speaker: any;

    constructor(name, startTime, endTime, date, speaker, id?) {
        super(name, startTime, endTime, date);
        this.speaker = speaker;
        this.id = id;
    }
}
