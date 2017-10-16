import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonpModule } from '@angular/http';
import { CropperComponent } from '../cropper-event/cropper.component';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@Component({
	selector: 'app-add-agenda',
	templateUrl: './add-agenda.component.html',
	styleUrls: ['../add-event/add-event.component.scss']
})


export class AddAgendaComponent implements OnInit {

	logoCamera: string = '/assets/images/camera.png';
	isAction: boolean = true;
	isReport: boolean = false;
	myFormAgenda: FormGroup;
	constructor(private fb: FormBuilder) { }

	action() {
		this.isAction = true;
		this.isReport = false;
	}

	report() {
		this.isAction = false;
		this.isReport = true;
	}

	ngOnInit() {
		this.myFormAgenda = this.fb.group({
			name: new FormControl(''),
			descr: new FormControl(''),
			photoEvent: new FormControl('')
		});
	}


}
