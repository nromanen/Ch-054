import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../module_ts/event';
import { EventService } from '../services/event/event.service';

@Component({
  selector: 'app-all-events-component',
  templateUrl: './all-events-component.component.html',
  styleUrls: ['./all-events-component.component.scss']
})
export class AllEventsComponentComponent implements OnInit {
  events: Event;


  constructor( private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getAllEvents().subscribe(events => {
      this.events = events;
		});
  }


}
