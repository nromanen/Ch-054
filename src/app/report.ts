import { Action } from './action';

export class Report extends Action {
    // id: number;
    speaker: string;

    constructor(name, startTime, endTime, date, speaker) {
        super(name, startTime, endTime, date);
        this.speaker = speaker;
    }
}
