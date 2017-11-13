import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Speaker } from '../../module_ts/speaker';

@Injectable()
export class SpeakerService {

  constructor(private http: Http) { }

  saveSpeaker(speaker: Speaker) {
    return this.http.post('/api/speakers/post', speaker)
      .map(res => res.json()).subscribe();
  }
}
