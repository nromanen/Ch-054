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
  isShowErrorPhoto = false;
  isValidSize: boolean = true;
  messageErrorPhoto = '';

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

onloadPhoto(image, width, height){
  // console.log(this);
  // let img = new Image();
  if (width < this.cropperSettingsWidth || height < this.cropperSettingsHeight) {
    //TODO change img.onload=null. 
    image.onload = null;
    this['src'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    this.cropper.reset();
    this.messageErrorPhoto = 'Invalid image size (' + width + '*' + height + '). Valid size is: ' + this.cropperSettingsWidth + '*' + this.cropperSettingsHeight;
    this.isShowErrorPhoto = true;
    this.isValidSize = false;
    return false;
  }
}

validationPhotoType(file:File){
  var getExtensionImage = file.type.split('/');
  var checkimg = getExtensionImage[1].toLowerCase();
  var extensionImage = ['jpg', 'png', 'PNG', 'JPG', 'jpeg', 'JPEG'];
  if (extensionImage.indexOf(checkimg) == -1) {
    this.messageErrorPhoto = 'Invalid image type. Valid type is: jpg, png, jpeg';
    this.isShowErrorPhoto = true;
    this.cropper.reset();
    return false;
  }
}

  // fileChangeListener(event) {
  //   this.isShowErrorPhoto = false;
  //   this.isValidSize = true;
  //   var image = new Image();
  //   var file: File = event.target.files[0];
  //   var myReader: FileReader = new FileReader();
  //   var that = this;

  //   image.onload = function () {
  //     let width = image.width;
  //     let height = image.height;
  //     if (width < that.cropperSettingsWidth || height < that.cropperSettingsHeight) {
  //       that.cropper.reset();
  //       image.onload = null;
  //       this['src'] = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  //       that.messageErrorPhoto = 'Invalid image size (' + width + '*' + height + '). Valid size is: ' + that.cropperSettingsWidth + '*' + that.cropperSettingsHeight;
  //       that.isShowErrorPhoto = true;
  //       that.isValidSize = false;
  //       return false;
  //     }
  // };

  //   myReader.onloadend = function (loadEvent: any) {
  //     that.validationPhotoType(file);
  //     image.src = loadEvent.target.result;
  //     that.cropper.setImage(image);
  //   };
  //   that.event = event;
  //   if (file) {
  //     myReader.readAsDataURL(file);
  //   }
  //   if (!file && !this.isValidSize) {
  //     this.cropper.reset();
  //     return false;
  //   }
  // }

  fileChangeListener(event) {
    this.isShowErrorPhoto = false;
    this.isValidSize = true;
    var image = new Image();
    var file: File = event.target.files[0];
    var myReader: FileReader = new FileReader();
    var that = this;


    image.onload = function () {
      let width = image.width;
      let height = image.height;
      if (width < that.cropperSettingsWidth || height < that.cropperSettingsHeight) {
        //TODO change img.onload=null. 
        image.onload = null;
        this['src'] = 'data:image/gif;base64,R0lGODlhAQABisValidSizeisValidSizeACH5BAEKisValidSizeEALisValidSizeisValidSizeisValidSizeBisValidSizeEisValidSizeAICTAEAOw==';
        that.cropper.reset();
        that.messageErrorPhoto = 'Invalid image size (' + width + '*' + height + '). Valid size is: ' + that.cropperSettingsWidth + '*' + that.cropperSettingsHeight;
        that.isShowErrorPhoto = true;
        that.isValidSize = false;
        console.log(that.isValidSize);
        if (!file && that.isValidSize) {
          that.cropper.reset();
          return false;
        }
        return false;
      }
    };
    myReader.onloadend = function (loadEvent: any) {
      that.validationPhotoType(file);
      image.src = loadEvent.target.result;
      if(that.isValidSize==true){console.log('hghgjhg');}
      that.cropper.setImage(image);
    };
    that.event = event;
    console.log(this.isValidSize);
    if (file) {
      myReader.readAsDataURL(file);
    }
    if (!file && !this.isValidSize) {
      this.cropper.reset();
      return false;
    }
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
    this.setCropperSettingCanvas();
  }

  ngOnInit() {
    this.cropperSettings1.width = this.cropperSettingsWidth;
    this.cropperSettings1.height = this.cropperSettingsHeight;
    this.cropperSettings1.croppedWidth = this.cropperSettingsWidth;
    this.cropperSettings1.croppedHeight = this.cropperSettingsHeight;
  }


  @Output() onChanged = new EventEmitter<any[]>();

}

