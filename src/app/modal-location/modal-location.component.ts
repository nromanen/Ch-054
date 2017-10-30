import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperLocationComponent } from '../cropper-location/cropper-location.component';
import { CropperComponent } from '../cropper-event/cropper.component';
import { EventLocation } from '../module_ts/location';

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
  photos: Array<String[]> = [[], []];
  location: EventLocation;


  constructor(private modalService: NgbModal, private fb: FormBuilder) { }

  open(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
  }

  onChanged(imgCrop, indexImg) {
    for (let i = 0; i < this.photos.length; i++) {
      if (this.photos[i].length === 0) {
        this.photos[i].push(indexImg);
        this.photos[i].push(imgCrop.image);
        console.log(this.photos);
        return;
      }
      if (indexImg === this.photos[i][0]) {
        this.photos[i][1] = imgCrop.image;
        console.log(this.photos);
        return;
      }
    }
  }

  save(form) {
    this.location = new EventLocation(form.address, form.city, form.country, this.photos);
    console.log(this.location);

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
