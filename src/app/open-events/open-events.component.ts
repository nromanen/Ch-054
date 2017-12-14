import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../module_ts/event';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxCarousel } from 'ngx-carousel';
import { EventService } from '../services/event/event.service';
@Component({
  selector: 'app-open-events',
  templateUrl: './open-events.component.html',
  styleUrls: ['./open-events.component.scss']
})
export class OpenEventsComponent implements OnInit {

  events: Event[] =[];
  eventStart: boolean = true;
  eventEnd: boolean = false;
  clickEvents: number = 0;
  carouselTile: NgxCarousel;
  
    constructor(private eventService: EventService, private spinnerService: Ng4LoadingSpinnerService) { }
  
    ngOnInit() {
      this.showSnipper();
      this.getAllEvents();
      this.carouselTile = {
        grid: {xs: 1, sm: 1, md: 2, lg: 2, all: 0},
        slide: 1,
        speed: 300,
        animation: 'lazy',
        touch: true,
        easing: 'ease',
        point: {
          visible: false
        },
        loop: true
      }
    }

    ngAfterViewInit() {
      setTimeout(function () { this.spinnerService.hide() }.bind(this), 500);
    }

    previousEvent(events){
      --this.clickEvents;
      console.log(events.length-1);
      if(this.clickEvents >= 0) this.eventEnd = false;
      if(this.clickEvents == 0) this.eventStart = true;
    }

    nextEvent(events){
      this.eventStart = false;
      ++this.clickEvents;
      if(this.clickEvents == events.length-2) this.eventEnd = true;
    }
  
    showSnipper(){
      this.spinnerService.show();
    }
  
    getAllEvents() {
      let today = new Date();      
      this.eventService.getAllEvents().subscribe(events => {
        events.forEach(event => {
          let currentDateFrom = new Date(event.date_from);
          let currentDateTo = new Date(event.date_to);
          if(currentDateFrom>=today || currentDateTo>=today){
            this.events.push(event);
          }
        });
        
      });
    }

    
}
