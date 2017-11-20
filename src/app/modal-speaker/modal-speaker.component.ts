import { Component, ViewEncapsulation, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CropperComponent } from '../cropper-event/cropper.component';
import { Speaker } from '../module_ts/speaker';
import { SpeakerService } from '../services/speaker/speaker.service';

@Component({
  selector: 'app-modal-speaker',
  templateUrl: './modal-speaker.component.html',
  styleUrls: ['./modal-speaker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSpeakerComponent implements OnInit {
  width: number = 430;
  height: number = 319;
  cropperSettingsWidth: number = 860;
  cropperSettingsHeight: number = 638;
  modalForm: FormGroup;
  photo: string = '';
  speaker: Speaker;
  isPhotoSpeaker: boolean = true;
  @Output() addedSpeaker = new EventEmitter<any>();


  constructor(private modalService: NgbModal, private formbuild: FormBuilder, private speakerService: SpeakerService) { }

  
  ngOnInit() {
    this.modalForm = this.formbuild.group({
      name: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(55)]),
      descr: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(5000)]),
      placeWork: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(55)]),
      position: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(55)])
    });
  }
  
  open(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'dark-modal' });
  }

  onChanged(imgCrop) {
    this.photo = imgCrop.image;
    if (this.photo !== '') {
      this.isPhotoSpeaker = false;
    }
  }

  save(form) {
    this.speaker = new Speaker(form.name, form.descr, form.placeWork, form.position, this.photo);
    this.isPhotoSpeaker = true;
    this.speakerService.saveSpeaker(this.speaker).subscribe(id => {
      this.speaker.id = id[0].id;
      this.addedSpeaker.emit(this.speaker);
    });
  }

  close() {
    this.modalForm.reset();
    this.isPhotoSpeaker = true;
  }

}
