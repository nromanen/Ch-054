import { Component, ViewChild, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-speaker',
  templateUrl: './modal-speaker.component.html',
  styleUrls: ['./modal-speaker.component.scss']
})
export class ModalSpeakerComponent {

  closeResult: string;
  
    constructor(private modalService: NgbModal) { }
  
    open(content) {
      this.modalService.open(content, { size: 'lg' });
    }

}
