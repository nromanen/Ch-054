import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../module_ts/event';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EventService } from '../services/event/event.service';
@Component({
  selector: 'app-open-events',
  templateUrl: './open-events.component.html',
  styleUrls: ['./open-events.component.scss']
})
export class OpenEventsComponent implements OnInit {

  events: Event[] =[];
  
    constructor(private eventService: EventService, private spinnerService: Ng4LoadingSpinnerService) { }
  
    ngOnInit() {
      this.showSnipper();
      this.getAllEvents();
    }
    ngAfterViewInit() {
      setTimeout(function () { this.spinnerService.hide() }.bind(this), 500);
    }
  
    showSnipper(){
      this.spinnerService.show();
    }
  
    getAllEvents() {
      let today = new Date();      
      this.eventService.getAllEvents().subscribe(events => {
        console.log(events);
        events.forEach(event => {
          let currentDateFrom = new Date(event.date_from);
          let currentDateTo = new Date(event.date_to);
          if(currentDateFrom.getDay() >= today.getDay() && currentDateFrom.getMonth() === today.getMonth()|| currentDateTo.getDay() >= today.getDay() && currentDateTo.getMonth()){
            this.events.push(event);
          }
        });
      });
    }

}
