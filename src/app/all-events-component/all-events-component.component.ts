import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../module_ts/event';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxCarousel } from 'ngx-carousel';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-all-events-component',
  templateUrl: './all-events-component.component.html',
  styleUrls: ['./all-events-component.component.scss']
})
export class AllEventsComponentComponent implements OnInit, AfterViewInit {
  events: Event;
  eventStart: boolean = true;
  eventEnd: boolean = false;
  clickEvents: number = 0;
  carouselTile: NgxCarousel;

  constructor(private eventService: EventService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.showSnipper();
    this.getAllEvents();
    this.carouselTile = {
      grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
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
    this.showSnipper();
    this.getAllEvents();

    const one = ['a', 'b', 'c']
    const two = ['d', 'e', 'f']
    const three = ['g', 'h', 'i'];
    
  }
  ngAfterViewInit() {
    setTimeout(function () { this.spinnerService.hide() }.bind(this), 500);
  }

  previousEvent(events) {
    --this.clickEvents;
    if (this.clickEvents >= 0) this.eventEnd = false;
    if (this.clickEvents == 0) this.eventStart = true;
  }

  nextEvent(events) {
    this.eventStart = false;
    ++this.clickEvents;
    if (this.clickEvents == events.length - 3) this.eventEnd = true;
  }

  showSnipper() {
    this.spinnerService.show();
  }

  getAllEvents() {
    let today = new Date();
    this.eventService.getAllEvents().subscribe(events => {
      events.forEach(event => {
        let eventDateFrom = new Date(event.date_from);
        let eventDateTo = (event.date_to) ? new Date(event.date_to) : false;
        event.date_from = eventDateFrom;
        if (eventDateTo) {
          event.style = (eventDateTo < today) ? true : false;
        } else {
          event.style = (eventDateFrom < today) ? true : false;
        }

      });
      this.events = events;
    });
  }
}
