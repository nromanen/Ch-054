import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ConfService} from '../conf-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {Conf} from '../conf';

@Component({
  selector: 'app-all-events-component',
  templateUrl: './all-events-component.component.html',
  styleUrls: ['./all-events-component.component.scss']
})
export class AllEventsComponentComponent implements OnInit {
  date = new Date;
  season = 'Summer';
  items: Conf[]=[];
  constructor(private af: AngularFireDatabase) { }

  ngOnInit() {
    this.af.list('/conference', { preserveSnapshot: true})
    .subscribe(snapshots=>{
        snapshots.forEach(childSnapshot => {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
          this.items.push(item);
        });
    })
  }

}
