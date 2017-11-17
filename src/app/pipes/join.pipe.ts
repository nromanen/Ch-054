import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'join'
})
export class JoinPipe implements PipeTransform {
    transform(time: string): string {
        if (time.length <= 0) return '';
        let arrTime = time.split(':');
        if (arrTime[0].length < 2) arrTime[0] = '0' + arrTime[0]; 
        if (arrTime[1].length < 2) arrTime[1] = '0' + arrTime[1];
        return arrTime[0] + ':' + arrTime[1];
    }
}
