import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Speaker } from '../../module_ts/speaker';

@Injectable()
export class SpeakerService {

  constructor(private http: Http) { }

  getAllSpeakers() {
    return this.http.get('/api/speakers/get')
      .map(res => res.json());
  }

  saveSpeaker(speaker: Speaker, ) {
    return this.http.post('/api/speakers/post', speaker)
      .map(res => res.json());
  }
}
