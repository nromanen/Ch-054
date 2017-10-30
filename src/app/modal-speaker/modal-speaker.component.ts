import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperComponent } from '../cropper-event/cropper.component';
import { Speaker } from '../module_ts/speaker';

@Component({
  selector: 'app-modal-speaker',
  templateUrl: './modal-speaker.component.html',
  styleUrls: ['./modal-speaker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSpeakerComponent {
  width: number = 430;
	height: number = 319;
	cropperSettingsWidth: number = 860;
	cropperSettingsHeight: number = 638;
  modalForm: FormGroup;
  photo: string = '';
  speaker: Speaker;
  
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.modalForm = this.fb.group({
			name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15)]),
			descr: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
			placeWork: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
			position: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(10)])
		});
  }
  
  
    open(content) {
      this.modalService.open(content, { size: 'lg',  windowClass: 'dark-modal' });
    }
  
    onChanged(imgCrop) {
      this.photo = imgCrop.image;
    }
  
    save(form) {
      this.speaker = new Speaker(form.name, form.descr, form.placeWork, form.position, this.photo);
    }

}
