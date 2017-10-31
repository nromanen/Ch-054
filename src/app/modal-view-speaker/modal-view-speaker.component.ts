import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Speaker } from '../module_ts/speaker';

@Component({
  selector: 'app-modal-view-speaker',
  templateUrl: './modal-view-speaker.component.html',
  styleUrls: ['./modal-view-speaker.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalViewSpeakerComponent implements OnInit {
  @Input() speakers;

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, { size: 'lg'});
  }
  ngOnInit() {
  }

}
