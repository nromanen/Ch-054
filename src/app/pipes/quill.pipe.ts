import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'quill'
})
export class QuillPipe implements PipeTransform {
    transform(descrition: string): any {
        return 
    }
}
