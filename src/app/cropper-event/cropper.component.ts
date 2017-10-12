import { Component, NgModule, ViewChild } from '@angular/core'
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
  cropperSettings1: CropperSettings;
  croppedWidth: number;
  croppedHeight: number;
  isShowCropper: boolean = true;
  isHiddeCropper: boolean = false;
  event: any;

  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {
    this.name = 'Angular2'
    this.cropperSettings1 = new CropperSettings();
    this.cropperSettings1.width = 1080;
    this.cropperSettings1.height = 540;

    this.cropperSettings1.croppedWidth = 1080;
    this.cropperSettings1.croppedHeight = 540;

    this.cropperSettings1.canvasWidth = 500;
    this.cropperSettings1.canvasHeight = 300;

    this.cropperSettings1.minWidth = 135;
    this.cropperSettings1.minHeight = 270;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.noFileInput = true;


    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

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


}
