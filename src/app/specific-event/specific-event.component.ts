import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../module_ts/event';
import { EventService } from '../services/event/event.service';
import { EventLocation } from '../module_ts/location';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  event: Event;
  isShow: boolean = false;
  id = +this.route.snapshot.paramMap.get('id');
  constructor( @Inject(DOCUMENT) private document: Document, private eventService: EventService, private route: ActivatedRoute, private locationService: LocationService) { }
  ngOnInit() {
    this.getEvent();
  }

  getEvent() {
    this.eventService.getEvent(this.id).subscribe(currentEvent => {
      let currentLocationPhoto = [];
      this.locationService.getLocationPhotos(currentEvent.id).subscribe(photos => currentLocationPhoto.push(photos));
      let currentLocation = new EventLocation(currentEvent.address, currentEvent.city, currentEvent.country, currentLocationPhoto);
      this.event = new Event(currentEvent.name, currentEvent.description, currentEvent['date_from'], currentEvent['date_to'], currentEvent.photo, currentLocation);
      console.log('one', this.event);
    });
    console.log('2', this.event);
  }

  goTo(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
  }

  up(): any {
    function onEdit() {
      let t;
      let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      if (top > 0) {
        window.scrollBy(0, -100);
        t = setTimeout(onEdit, 20);
      } else clearTimeout(t);
      return false;
    }
    return onEdit();
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (position > 300) {
      this.isShow = true;
    } else
      this.isShow = false;
  }
}
