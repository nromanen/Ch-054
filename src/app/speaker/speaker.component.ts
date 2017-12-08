import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakerService } from '../services/speaker/speaker.service';
import { EventService } from '../services/event/event.service';
import { Speaker } from '../module_ts/speaker';

@Component({
  selector: 'app-speaker',
  animations: [],
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  speaker: Speaker;
  events = [];
  id = +this.route.snapshot.paramMap.get('id');

  constructor(public speakerService: SpeakerService, private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSpeaker();
    this.getEventsOfSpeaker();
  }

  getSpeaker() {
    this.speakerService.getSpeakerById(this.id).subscribe(speaker => {
      let currentSpeaker = new Speaker(speaker.full_name, speaker.description,
        speaker.placework, speaker.position, speaker.photo);
      currentSpeaker.id = speaker.id;
      this.speaker = currentSpeaker;
    }
    );
  }

  getEventsOfSpeaker(){
    this.eventService.getEventsByIdSpeaker(this.id).subscribe(events=> 
      this.events = events
    );
  }

}
