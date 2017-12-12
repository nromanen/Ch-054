import { Component, OnInit } from '@angular/core';
import {RouterLinkActive, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  imgLogo = '/assets/images/logo-pr.png';
  constructor() { }

  ngOnInit() {
  }

}
