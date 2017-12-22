import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
  events: Array<Event[]> = [];
  eventStart: boolean = true;
  eventEnd: boolean = false;
  clickEvents: number = 0;
  carouselTile: NgxCarousel;
  gridCarousel: number = 3;

  constructor(private eventService: EventService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.showSnipper();
    this.getAllEvents();
    this.carouselTile = {
      grid: { xs: 1, sm: 2, md: 2, lg: 3, all: 0 },
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
    this.gridCarousel = (window.innerWidth < 1199 && window.innerWidth >= 768) ? 2 : (window.innerWidth <= 767) ? 1 : 3;
    ++this.clickEvents;
    if (this.clickEvents == events.length - this.gridCarousel) this.eventEnd = true;
  }

  showSnipper() {
    this.spinnerService.show();
  }

  getAllEvents() {
    this.eventService.getAllEvents().subscribe(events => {
      this.addEventsByDateToEvents(events);
      this.isCloseEvent(events);
      this.eventEnd = (events <= 3) ? true : false;
    });
  }

  addEventsByDateToEvents(events) {
    this.events = [];
    let currentEventYearFrom = new Date(events[0].date_from).getFullYear(),
      currentEventYearTo = (events[0].date_to) ? new Date(events[0].date_to).getFullYear() : false,
      currentArrayToPush: Array<Event> = [];
    events.forEach(event => {
      let eventYearFrom = new Date(event.date_from).getFullYear(),
        eventYearTo = (event.date_to) ? new Date(event.date_to).getFullYear() : false;
      if (currentEventYearTo && eventYearTo) {
        if (currentEventYearTo === eventYearTo) {
          event.year = eventYearTo;
          currentArrayToPush.push(event);
        }
      } else if (currentEventYearFrom === eventYearFrom) {
        event.year = eventYearFrom;
        currentArrayToPush.push(event);
      } else {
        event.year = eventYearFrom;
        this.events.push(currentArrayToPush);
        currentEventYearFrom = eventYearFrom;
        currentEventYearTo = eventYearTo;
        currentArrayToPush = [];
        currentArrayToPush.push(event);
      }
    });
    this.events.push(currentArrayToPush);
  }

  isCloseEvent(events) {
    let today = new Date();
    events.forEach(event => {
      let eventDateFrom = new Date(event.date_from),
        eventDateTo = (event.date_to) ? new Date(event.date_to) : false;
      if (eventDateTo) {
        event.style = (eventDateTo < today) ? true : false;
      } else {
        event.style = (eventDateFrom < today) ? true : false;
      }
    });
  }

  onResize(event) {
    this.gridCarousel = (window.innerWidth < 1199 && window.innerWidth >= 768) ? 2 : (window.innerWidth <= 767) ? 1 : 3;
  }
}
