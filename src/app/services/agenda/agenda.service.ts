import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Action } from '../../module_ts/action';
import { Report } from '../../module_ts/report';

@Injectable()
export class AgendaService {

  constructor(private http: Http) { }

  postAction(action: Action) {
    return this.http.post('/api/agenda/action/post', action)
      .map(res => res.json())
  }

  saveAction(action: Action) {
    this.postAction(action).subscribe(actionRespArray => {
      action.id = actionRespArray[0].id;
    });
  }

  saveReport(report: Report) {
    this.postAction(report).subscribe(actionRespArray => {
      report.id = actionRespArray[0].id;
      this.http.post('/api/agenda/report/post', report)
        .map(res => res.json()).subscribe();
    });
  }

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
