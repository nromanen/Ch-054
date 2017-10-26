import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'pipeDate'
})
export class DatePipe implements PipeTransform {
    transform(date: any): string {
        if (Object.keys(date).length <= 0) return '';
        let dateYear = 'year';
        let dateMonth = 'month';
        let dateDay = 'day';
        let fullStrDateYear = date[dateYear].toString();
        let shortYear = '';
        for (let i = 2; i < fullStrDateYear.length; i++){
            console.log(fullStrDateYear[i]);
            shortYear += fullStrDateYear[i];
        }
       
        return date[dateDay] + '.' + date[dateMonth] + '.' + shortYear;
    }
}