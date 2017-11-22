import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../module_ts/event';
import { EventService } from '../services/event/event.service';
import { EventLocation } from '../module_ts/location';
import { LocationService } from '../services/location/location.service';
import { AgendaService } from '../services/agenda/agenda.service';
import { SpeakerService } from '../services/speaker/speaker.service'
import { Action } from '../module_ts/action';
import { Report } from '../module_ts/report';
import { Speaker } from '../module_ts/speaker';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  event: Event;
  isShow: boolean = false;
  schedules: Array<Action[]>
  speakers: Array<Speaker>;
  id = +this.route.snapshot.paramMap.get('id');


  constructor( @Inject(DOCUMENT) private document: Document, private eventService: EventService, private route: ActivatedRoute, private locationService: LocationService, private agendaService: AgendaService, public speakerService: SpeakerService) { }
  ngOnInit() {
    this.getEvent();
    this.getAgenda();
    this.getSpeakers();
  }

  getEvent() {
    this.eventService.getEvent(this.id).subscribe(currentEvent => {
      let currentLocationPhoto = [];
      this.locationService.getLocationPhotos(currentEvent.id).subscribe(photos => currentLocationPhoto.push(photos));
      let currentLocation = new EventLocation(currentEvent.address, currentEvent.city, currentEvent.country, currentLocationPhoto);
      this.event = new Event(currentEvent.name, currentEvent.description, currentEvent['date_from'], currentEvent['date_to'], currentEvent.photo, currentLocation);
    });
  }

  getAgenda() {
    this.agendaService.getAgendaByEventId(this.id).subscribe(currentActions => {
      this.prepareAllActions(currentActions);
    });
  }

  prepareAllActions(currentActions: any) {
    this.schedules = [];
    let currentDate = currentActions[0]['date'];
    let currentArrayToPush: Array<Action> = [];
    currentActions.forEach(currentAction => {
      if (currentAction['date'] === currentDate) {
        currentArrayToPush.push(this.createActionOrReport(currentAction));
      } else {
        this.schedules.push(currentArrayToPush.sort(this.sortStrategy));
        currentDate = currentAction.date;
        currentArrayToPush = [];
        currentArrayToPush.push(this.createActionOrReport(currentAction));
      }
    });
    this.schedules.push(currentArrayToPush.sort(this.sortStrategy));
  }

  createActionOrReport(currentItem: any) {
    if (currentItem['speaker_id'] === null) {
      return new Action(
        currentItem.tittle, currentItem.start_time,
        currentItem.end_time, new Date(currentItem.date), currentItem.id
      )
    } else {
      return new Report(currentItem.tittle, currentItem.start_time,
        currentItem.end_time, new Date(currentItem.date), currentItem.full_name);
    }
  }

  sortStrategy(action1: Action, action2: Action) {
    let hoursOfAction1 = Number(action1.startTime.split(':')[0]);
    let hoursOfAction2 = Number(action2.startTime.split(':')[0]);
    let minutesOfAction1 = Number(action1.startTime.split(':')[1]);
    let minutesOfAction2 = Number(action2.startTime.split(':')[1]);
    return hoursOfAction1 * 60 + minutesOfAction1 - (hoursOfAction2 * 60 + minutesOfAction2);
  }

  getSpeaker(speakerId) {
    this.speakerService.getSpeakersByEvent(this.id).subscribe(currentSpeakers => {
      currentSpeakers.forEach(speaker => {
        if (speaker['id'] === speakerId) {
          return speaker['full_name'];
        }
      });
    });
  }

  getSpeakers() {
    this.speakerService.getSpeakersByEvent(this.id).subscribe(currentSpeakers => {
      this.speakers = [];
      currentSpeakers.forEach(speaker => {
        this.speakers.push(new Speaker(speaker['full_name'], speaker['description'], speaker['placework'], speaker['position'], speaker['photo'], speaker['id']));
      });
    });
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
