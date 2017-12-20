import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

export class dates{
    name: string;
    password: string;
}

@Injectable()
    export class DateService  {  

    private dates: BehaviorSubject<dates>; 

   constructor() {
       this.dates = <BehaviorSubject<dates>>new BehaviorSubject({});
   }
   getdates(){
       return this.dates.asObservable();
   }

   setdates(username: string, password: string){
       this.dates.next({name: username, password: password})
   }
}