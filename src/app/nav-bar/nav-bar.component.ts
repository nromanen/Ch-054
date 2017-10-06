import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  img_logo ="/assets/images/logo-pr.png";
  background={link:"/assets/images/imgNav.jpg"}
  constructor() { }

  ngOnInit() {
  }

}
