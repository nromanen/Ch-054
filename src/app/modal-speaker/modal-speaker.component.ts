import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperComponent } from '../cropper-event/cropper.component';

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
  
  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.modalForm = this.fb.group({
			name: new FormControl(''),
			descr: new FormControl(''),
			placeWork: new FormControl(''),
			position: new FormControl(''),
			photoEvent: this.fb.group({
				cropper: new FormControl()
			})
		});
  }
  
  
    open(content) {
      this.modalService.open(content, { size: 'lg',  windowClass: 'dark-modal' });
    }

}
