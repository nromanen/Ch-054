import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperLocationComponent } from '../cropper-location/cropper-location.component';
import { CropperComponent } from '../cropper-event/cropper.component';
import { EventLocation } from '../module_ts/location';
import { LocationService } from '../services/location/location.service';

@Component({
  selector: 'app-modal-location',
  templateUrl: './modal-location.component.html',
  styleUrls: ['./modal-location.component.scss']
})
export class ModalLocationComponent implements OnInit {
  width: number = 852;
  height: number = 480;
  tittlePhotoOne: string = "Location one";
  tittlePhotoTwo: string = "Location two";
  cropperSettingsWidth: number = 852;
  cropperSettingsHeight: number = 480;
  modalFormLocat: FormGroup;
  closeResult: string;
  hideModal: boolean = false;
  photos: Array<String[]> = [[], []];
  isNullPhotos: boolean = true;
  location: EventLocation;


  constructor(private modalService: NgbModal, private formbuild: FormBuilder, private locationService: LocationService) { }

  open(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
  }

  onChanged(imgCrop, indexImg) {
    for (let i = 0; i < this.photos.length; i++) {
      if (this.photos[i].length === 0) {
        this.photos[i].push(indexImg);
        this.photos[i].push(imgCrop.image);
        if (i === 1) {
          this.isNullPhotos = false;
        }
        return;
      }
      if (indexImg === this.photos[i][0]) {
        this.photos[i][1] = imgCrop.image;
        return;
      }
    }
  }

  save(form) {
    this.location = new EventLocation(form.address, form.city, form.country, this.photos);
    this.locationService.saveLocation(this.location);
  }

  ngOnInit() {
    this.modalFormLocat = this.formbuild.group({
      country: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl('')
    });
    this.locationService.getAllLocations().subscribe(locations => console.log(locations));
  }
} 
