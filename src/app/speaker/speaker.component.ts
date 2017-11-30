import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeakerService } from '../services/speaker/speaker.service';
import { Speaker } from '../module_ts/speaker';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {
  speaker: Speaker;

  constructor(public speakerService: SpeakerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getSpeaker();
  }

  getSpeaker() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.speakerService.getSpeakerById(id).subscribe(speaker => {
      let currentSpeaker = new Speaker(speaker.full_name, speaker.description,
        speaker.placework, speaker.position, speaker.photo);
      currentSpeaker.id = speaker.id;
      this.speaker = currentSpeaker;
    }
    );
  }

}
