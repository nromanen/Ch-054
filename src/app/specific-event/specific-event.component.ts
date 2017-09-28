import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  background={link:"/assets/images/1.png"}
  bgLocation={link:"/assets/images/bg-location.png"}
  constructor() { }

  ngOnInit() {
  }

}
