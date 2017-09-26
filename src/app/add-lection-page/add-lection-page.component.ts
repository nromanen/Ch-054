import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-lection-page',
  templateUrl: './add-lection-page.component.html',
  styleUrls: ['./add-lection-page.component.scss']
})
export class AddLectionPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
