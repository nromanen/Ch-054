import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CropperComponent } from '../cropper-event/cropper.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Action } from '../module_ts/action';
import { Report } from '../module_ts/report';

@Component({
	selector: 'app-add-agenda',
	templateUrl: './add-agenda.component.html',
	styleUrls: [
		'./add-agenda.component.scss',
	],
	providers: [NgbTimepickerConfig]
})


export class AddAgendaComponent implements OnInit {

	logoCamera: string = '/assets/images/camera.png';
	isReport: boolean = true;
	isAction: boolean = false;
	myFormAction: FormGroup;
	myFormReport: FormGroup;

	time = { hour: '09', minute: '00' };
	timeReport = { hour: '09', minute: '00' };
	schedules: Array<Action[]> = [[],[]];

	//autocomplete
	model1 = "";
	arrayOfStrings: string[] =
	["Marius Barbulesco", "Stolte Jon kjfkj DDD fdjg GGG", "Brenda B Jon", "Lotrean Jon Maria", "Jason P Marcus", "Alfred T Marchese", "Hernandez Alex", "Cortes Ana",];


	constructor(private fb: FormBuilder, config: NgbTimepickerConfig) {
		config.spinners = false;
	}

	changeSelect() {
		this.isAction = !this.isAction;
		this.isReport = !this.isReport;
	}

	saveReport(form) {
		let report = new Report(form.nameReport, form.timeReportTo, form.timeReportFrom, form.dataPickerReport, form.speaker);
		this.schedules[1].push(report);
		console.log( this.schedules);

	}
	saveAction(form) {
		let action = new Action(form.nameAction, form.timeActionTo, form.timeActionFrom, form.dataPickerAction);
		this.schedules[0].push(action);
	}

	ngOnInit() {
		this.myFormAction = this.fb.group({
			nameAction: new FormControl(''),
			timeActionTo: new FormControl(''),
			timeActionFrom: new FormControl(''),
			dataPickerAction: new FormControl(''),
		});

		this.myFormReport = this.fb.group({
			speaker: '',
			nameReport: new FormControl(''),
			timeReportFrom: new FormControl(''),
			timeReportTo: new FormControl(''),
			dataPickerReport: new FormControl(''),

		});
	}


}
