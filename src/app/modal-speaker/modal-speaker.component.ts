import {Component, ViewEncapsulation} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-speaker',
  templateUrl: './modal-speaker.component.html',
  styleUrls: ['./modal-speaker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSpeakerComponent {

  closeResult: string;
  
    constructor(private modalService: NgbModal) { }
  
    open(content) {
      this.modalService.open(content, { size: 'lg',  windowClass: 'dark-modal' });
      // this.modalService.open(content,  { windowClass: 'dark-modal' });
    }

}
