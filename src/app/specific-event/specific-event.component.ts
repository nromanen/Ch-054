import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
