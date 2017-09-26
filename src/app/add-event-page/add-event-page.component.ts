import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
