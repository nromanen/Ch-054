import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../module_ts/event';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-all-events-component',
  templateUrl: './all-events-component.component.html',
  styleUrls: ['./all-events-component.component.scss']
})
export class AllEventsComponentComponent implements OnInit, AfterViewInit {
  events: Event;

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
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
    });
  }
}
