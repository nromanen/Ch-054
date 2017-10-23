import { Component, ViewChild, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperLocationComponent } from '../cropper-location/cropper-location.component'

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss']
})
export class ModalLocationComponent {
  width: number = 213;
	height: number = 120;
	cropperSettingsWidth: number = 852;
	cropperSettingsHeight: number = 480;
  modalFormLocat: FormGroup;
  closeResult: string;

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.modalFormLocat = this.fb.group({
      country: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      photoEvent: this.fb.group({
        cropper: new FormControl()
      })
    });
  }

  open(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
  }

} 
