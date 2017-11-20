import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Event } from '../../module_ts/event';
import { EventLocation } from '../../module_ts/location';

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getAllEvents() {
    return this.http.get('/api/events/get')
      .map(res => res.json());
  }

  getEvent(eventsId: number) {
    return this.http.get('/api/events/get/' + eventsId)
      .map(res => res.json());
  }

  getEventsSpeakers(eventsId: number) {
    return this.http.get('/api/events/speakers/get' + eventsId)
      .map(res => res.json());
  }

  saveEvent(event: Event) {
    return this.http.post('/api/events/post', event)
      .map(res => res.json()).subscribe(id => {
        event.id = id[0].id;
      });
  }

  updateEvent(event: Event) {
    return this.http.post('/api/events/update', event)
      .map(res => res.json()).subscribe();
  }

}
