import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonpModule } from '@angular/http';
import { CropperComponent } from '../cropper-event/cropper.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbdButtonsRadio } from './buttons-radio';



@Component({
	selector: 'app-add-agenda',
	templateUrl: './add-agenda.component.html',
	styleUrls: ['../add-event/add-event.component.scss']
})


	
	
export class AddAgendaComponent implements OnInit {
	
	logoCamera: string = '/assets/images/camera.png';
	myFormAgenda: FormGroup;
	constructor(private fb: FormBuilder) {} 

	ngOnInit() {
		this.myFormAgenda = this.fb.group({
			name: new FormControl(''),
			descr: new FormControl(''),
			photoEvent: new FormControl('')
		});
	}


}
