import { Component, HostListener, Inject, OnInit } from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-specific-event',
  templateUrl: './specific-event.component.html',
  styleUrls: ['./specific-event.component.scss']
})
export class SpecificEventComponent implements OnInit {
  background={link:"/assets/images/1.png"}
  bgLocation={link:"/assets/images/bg-location.png"}


  public isShow: boolean = false;
  
  constructor(@Inject(DOCUMENT) private document: Document) { }
 



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

  @HostListener("window:scroll", [])
  onWindowScroll() {
    let position = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (position > 400) {
      this.isShow = true;
    } else if (this.isShow && position < 400) {
      this.isShow = false;
    }
  }


}
