import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

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
