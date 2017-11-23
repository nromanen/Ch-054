import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-view-location',
  templateUrl: './modal-view-location.component.html',
  styleUrls: ['./modal-view-location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalViewLocationComponent implements OnInit {

  @Input() locations;
  
    constructor(private modalService: NgbModal) { }
  
    ngOnInit() {
    }
  
    open(content) {
      this.modalService.open(content, { size: 'lg'});
    }

}
