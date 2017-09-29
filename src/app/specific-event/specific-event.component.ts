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
  ngOnInit() {
  }

}
