import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {Conf} from '../conf';
import * as firebase from 'firebase';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  background={link:"/assets/images/1.png"}
  bgLocation={link:"/assets/images/bg-location.png"}
  items: Conf[] = [];

  public isShow: boolean = false;
  
  constructor(@Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, private af: AngularFireDatabase) { }

 
  goTo(location: string): void {
    window.location.hash = ''; 
    window.location.hash = location;
}

up():any{
  let t;
  function onEdit(){
      let top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
      if(top > 0) {
        window.scrollBy(0,-100);
        this.t = setTimeout(onEdit,20);
      } else clearTimeout(this.t);
      return false;
    } 
    return onEdit();
  }
  key:any;
  ngOnInit(): void {
    this.key = this.route.snapshot.params['key'];
    var adaRef = firebase.database().ref("conference/" +this.key);
    // console.log(adaRef.key);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (position > 400) {
      this.isShow = true;
    } else //if (this.isShow && position < 400) {
      this.isShow = false;
    //}
  }


}
