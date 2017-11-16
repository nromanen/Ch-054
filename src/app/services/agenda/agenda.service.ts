import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Action } from '../../module_ts/action';

@Injectable()
export class AgendaService {

  constructor(private http: Http) { }

  getAllAgenda() {
    return this.http.get('/api/agenda/get')
      .map(res => res.json());
  }
  
  saveAgenda(agenda: Array<Action[]>) {
    return this.http.post('/api/agenda/post', agenda)
      .map(res => res.json())
      .subscribe();
  }


}
