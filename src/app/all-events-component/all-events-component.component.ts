import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConfService } from '../conf-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { Conf } from '../conf';

@Component({
  selector: 'app-all-events-component',
  templateUrl: './all-events-component.component.html',
  styleUrls: ['./all-events-component.component.scss']
})
export class AllEventsComponentComponent implements OnInit {
  date = new Date;
  season = 'Summer';
  items: Conf[] = [];
  //item: Conf = new Conf();
  constructor(private af: AngularFireDatabase) { }

  ngOnInit(): void {
    this.af.list('/conference', { preserveSnapshot: true })
      .subscribe(snapshots => {
        snapshots.forEach(childSnapshot => {
          let item = new Conf();
          for (let variable in childSnapshot.val()) {
            item[variable] = childSnapshot.val()[variable];
          }
          item['confDateTo'] = new Date(childSnapshot.val()['confDateTo'].year, childSnapshot.val()['confDateTo'].month, childSnapshot.val()['confDateTo'].day);
          item.key = childSnapshot.key;
          this.items.push(item);
        });
      })
  }


}
