import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperLocationComponent } from '../cropper-location/cropper-location.component';
import { CropperComponent } from '../cropper-event/cropper.component';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss']
})
export class ModalLocationComponent implements OnInit {
  width: number = 246;
  height: number = 60;
  tittlePhotoOne: string = "Location one";
  tittlePhotoTwo: string = "Location two";
	cropperSettingsWidth: number = 852;
	cropperSettingsHeight: number = 480;
  modalFormLocat: FormGroup;
  closeResult: string;
  hideModal: boolean = false;


  constructor(private modalService: NgbModal, private fb: FormBuilder) {}

  open(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
  }

 

  save(form) {
    this.hideModal = true;
    console.log(form);
  }


  ngOnInit() {
    this.modalFormLocat = this.fb.group({
      country: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      photoEvent: this.fb.group({
        cropper: new FormControl()
      })
    });
  }

  

} 
