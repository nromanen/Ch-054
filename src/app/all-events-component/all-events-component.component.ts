import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-events-component',
  templateUrl: './all-events-component.component.html',
  styleUrls: ['./all-events-component.component.scss']
})
export class AllEventsComponentComponent implements OnInit {
  date = new Date;
  season = 'Summer';
  constructor() { }

  ngOnInit() {
  }

}
