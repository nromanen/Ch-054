import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform(time: any): string {
        if (Object.keys(time).length <= 0) return '';
        let timeHour = 'hour';
        let timeMinute = 'minute';
        if (time[timeHour].toString().length < 2) time[timeHour] = '0' + time[timeHour]; 
        if (time[timeMinute].toString().length < 2) time[timeMinute] = '0' + time[timeMinute];
        return time[timeHour] + ':' + time[timeMinute];
    }
}