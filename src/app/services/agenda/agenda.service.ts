import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Action } from '../../module_ts/action';
import { Report } from '../../module_ts/report';

@Injectable()
export class AgendaService {

  constructor(private http: Http) { }

  getAgendaByEventId(eventId: number) {
    return this.http.get('/api/agenda/get/' + eventId)
      .map(res => res.json());
  }

  postAction(action: Action) {
    return this.http.post('/api/agenda/actions/post', action)
      .map(res => res.json())
  }

  saveAction(action: Action, actions: Array<Action[]>, eventId: number) {
    this.postAction(action).subscribe(actionRespArray => {
      action.id = actionRespArray[0].id;
      this.getAgendaByEventId(eventId).subscribe(currentActions => {




        actions = currentActions;
      });
    });
  }

  deleteAction(eventId: number) {
    return this.http.post('/api/agenda/actions/delete/' + eventId, null)
      .map(res => res.json()).subscribe();
  }

  saveReport(report: Report) {
    this.postAction(report).subscribe(actionRespArray => {
      report.id = actionRespArray[0].id;
      this.http.post('/api/agenda/reports/post', report)
        .map(res => res.json()).subscribe();
    });
  }

  saveAgenda(agenda: Array<Action[]>) {
    return this.http.post('/api/agenda/post', agenda)
      .map(res => res.json())
      .subscribe();
  }
}
