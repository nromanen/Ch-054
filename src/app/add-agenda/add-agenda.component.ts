import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CropperComponent } from '../cropper-event/cropper.component';
import { BrowserModule } from '@angular/platform-browser';
import {NgbTimepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';



@Component({
	selector: 'app-add-agenda',
	templateUrl: './add-agenda.component.html',
	styleUrls: [
		'../add-event/add-event.component.scss',
		'./add-agenda.component.scss',
	],
	providers: [NgbTimepickerConfig]
})


export class AddAgendaComponent implements OnInit {

	logoCamera: string = '/assets/images/camera.png';
	isAction: boolean = true;
	isReport: boolean = false;
	myFormAgenda: FormGroup;

	time = { hour: '09', minute: '00' };
	timeReport = { hour: '09', minute: '00' };

	//autocomplete
	model1 = "";
	arrayOfStrings: string[] =
	["Marius Barbulesco", "Stolte Jon", "Brenda B Jon", "Lotrean Jon Maria", "Jason P Marcus", "Alfred T Marchese", "Hernandez Alex", "Cortes Ana",];

	constructor(private fb: FormBuilder, config: NgbTimepickerConfig) { config.spinners = false;}

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
			nameAction: new FormControl(''),
			timeActionTo: new FormControl(''),
			timeActionFrom: new FormControl(''),
			dataPickerAction: new FormControl(''),
			speaker: new FormControl(''),
			nameReport: new FormControl(''),
			timeReportFrom: new FormControl(''),
			timeReportTo: new FormControl(''),
			dataPickerReport: new FormControl(''),
			descr: new FormControl(''),
			photoEvent: new FormControl(''),

		});
	}


}
