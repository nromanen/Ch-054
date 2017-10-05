import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Conf } from '../conf';
import * as firebase from 'firebase';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  background = { link: "/assets/images/1.png" }
  bgLocation = { link: "/assets/images/bg-location.png" }
  item = new Conf();

  public isShow: boolean = false;

  constructor( @Inject(DOCUMENT) private document: Document, private route: ActivatedRoute, private af: AngularFireDatabase) { }


  goTo(location: string): void {
    window.location.hash = '';
    window.location.hash = location;
  }

  up(): any {
    function onEdit() {
      let t;
      let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
      if (top > 0) {
        window.scrollBy(0, -100);
        t = setTimeout(onEdit, 20);
      } else clearTimeout(t);
      return false;
    }
    return onEdit();
  }
  key: any;
  speakers: Array<object> = [];
  ngOnInit(): void {
    this.key = this.route.snapshot.params['key'];
    this.item.key = this.key;
    this.af.list(`conference/${this.key}`, { preserveSnapshot: true })
      .subscribe((snapshots) => {
        snapshots.forEach(snapshot => {
          this.item[snapshot.key] = snapshot.val();
        });
        //Date
        this.item['confDateTo'] = new Date(this.item['confDateTo']['year'], this.item['confDateTo']['month'], this.item['confDateTo']['day']);
        // PhotoLocation
        let photoLocation: string[] = [];
        for (let key in this.item.confphotoEventLocations) {
          photoLocation.push(this.item.confphotoEventLocations[key]);
        }
        this.item.confphotoEventLocations = photoLocation;
        //Photo speaker
        
        for (let key in this.item.confLections) {
          let speaker: Object = {lectionSpeaker:"", speakerPhoto:""};
          for (let property in this.item.confLections[key]) {
            if (property === 'lectionSpeaker') {
              speaker['lectionSpeaker'] = this.item.confLections[key][property];
              speaker['speakerPhoto'] = this.item.confLections[key]['speakerPhoto'];
              // console.log(this.speaker[index][property]);
              this.speakers.push(speaker);
            }
          }
          
        }



      }
      );

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
