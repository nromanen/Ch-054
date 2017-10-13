import { Component, NgModule, ViewChild, Input, OnChanges, NgZone, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { ImageCropperComponent, CropperSettings, Bounds, ImageCropper } from 'ng2-img-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],

})
export class CropperComponent {

  name: string;
  data1: any;
  cropperSettings1: CropperSettings = new CropperSettings();
  croppedWidth: number;
  croppedHeight: number;
  isShowCropper: boolean = true;
  isHiddeCropper: boolean = false;
  event: any;
  width: number = window.screen.width / 3;
  height: number = window.screen.height / 4;

  @Input() form: FormGroup;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {
    this.name = 'Angular2'
    //this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 1080;
    this.cropperSettings1.height = 540;

    this.cropperSettings1.croppedWidth = 1080;
    this.cropperSettings1.croppedHeight = 540;

    this.cropperSettings1.canvasWidth = this.width;
    this.cropperSettings1.canvasHeight = this.height;

    this.cropperSettings1.minWidth = 135;
    this.cropperSettings1.minHeight = 270;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.noFileInput = true;
    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;
    console.log(this.cropperSettings1.canvasWidth);

    this.data1 = {};
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  fileChangeListener(event) {
    var image = new Image();
    var file: File = event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    this.event = event;
    myReader.readAsDataURL(file);
    this.onChanged.emit(file.name);
  }

  showCropper() {
    this.isShowCropper = !this.isShowCropper;
    this.isHiddeCropper = false;
    this.fileChangeListener(this.event);
  }

  hiddeCropper() {
    this.isHiddeCropper = true;
    this.isShowCropper = false;
  }

  onResize(event) {
    const innerWidth = event.target.innerWidth;
    // this.height = innerWidth;
    // console.log(event);
    this.cropperSettings1.canvasWidth = 50;
    if (innerWidth <= 991) {

      console.log(this.width);
    }
  }


  @Output() onChanged = new EventEmitter<string>();

}
