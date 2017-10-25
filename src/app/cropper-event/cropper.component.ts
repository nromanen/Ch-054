import { Component, NgModule, ViewChild, Input, OnChanges, NgZone, EventEmitter, Output, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { ImageCropperComponent, CropperSettings, Bounds, ImageCropper } from 'ng2-img-cropper';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss'],

})
export class CropperComponent implements OnInit {


  @Input() width: number;
  @Input() height: number;
  @Input() cropperSettingsWidth: number;
  @Input() cropperSettingsHeight: number;


  name: string;
  data1: any;
  cropperSettings1: CropperSettings = new CropperSettings();
  croppedWidth: number;
  croppedHeight: number;
  isShowCropper: boolean = true;
  isHiddeCropper: boolean = false;
  event: any;
  isShowerrorTypePhoto = false;






  @Input() form: FormGroup;
  @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor() {
    this.name = 'Angular2'

    this.cropperSettings1.minWidth = this.cropperSettings1.width / 2;
    this.cropperSettings1.minHeight = this.cropperSettings1.height / 2;

    this.cropperSettings1.rounded = false;
    this.cropperSettings1.noFileInput = true;
    this.cropperSettings1.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.cropperSettings1.cropperDrawSettings.strokeWidth = 2;

    this.setCropperSettingCanvas();

    this.data1 = {};
  }

  cropped(bounds: Bounds) {
    this.croppedHeight = bounds.bottom - bounds.top;
    this.croppedWidth = bounds.right - bounds.left;
  }

  fileChangeListener(event) {
    var image = new Image();
    var file: File = event.target.files[0];
    var getExtensionImage = file.type.split('/');
    var checkimg = getExtensionImage[1].toLowerCase();
    var extensionImage = ['jpg', 'png', 'PNG', 'JPG', 'jpeg', 'JPEG'];
    if (extensionImage.indexOf(checkimg) == -1) { 
        this.isShowerrorTypePhoto = true;
        return false;
     }
    var myReader: FileReader = new FileReader();
    var that = this;
    image.onload = function () {
      // console.log(image.width + ' ' + image.height + that.cropperSettingsWidth);
      // that.imgWidth = image.naturalWidth || image.width;
      // if (that.imgWidth < that.cropperSettingsWidth) {
      //   alert(that.imgWidth + 'small');
      // }
    };

    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
    };
    this.event = event;
    myReader.readAsDataURL(file);

    console.log(file.type);
  }

  showCropper() {
    this.isShowCropper = !this.isShowCropper;
    this.isHiddeCropper = false;
    this.fileChangeListener(this.event);
  }

  hiddeCropper() {
    this.isHiddeCropper = true;
    this.isShowCropper = false;
    this.onChanged.emit(this.data1);

  }

  setCropperSettingCanvas() {
    this.cropperSettings1.canvasWidth = window.innerWidth / 3;
    this.cropperSettings1.canvasHeight = window.innerHeight / 4;
    if (this.cropper && this.cropper.cropper) {
      this.cropper.cropper.resizeCanvas(this.cropperSettings1.canvasWidth, this.cropperSettings1.canvasHeight, true);
    }
  }

  onResize(event) {
    const innerWidth = event.target.innerWidth;
    this.setCropperSettingCanvas();
    if (innerWidth <= 991) {


    }
  }

  ngOnInit() {
    this.cropperSettings1.width = this.cropperSettingsWidth;
    this.cropperSettings1.height = this.cropperSettingsHeight;
    this.cropperSettings1.croppedWidth = this.cropperSettingsWidth;
    this.cropperSettings1.croppedHeight = this.cropperSettingsHeight;
  }


  @Output() onChanged = new EventEmitter<any[]>();

}
