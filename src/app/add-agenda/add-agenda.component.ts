import { Component, OnInit, OnChanges, NgModule, SimpleChanges } from '@angular/core';
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
	isValid: boolean = true;

	time = { hour: '09', minute: '00' };
	timeReport = { hour: '09', minute: '00' };
	schedules: Array<Action[]> = [[], []];



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
		this.isValid = true;
		this.myFormReport.reset();
		this.myFormAction.reset();
	}

	saveReport(form) {
		let report = new Report(form.nameReport, form.timeReportTo, form.timeReportFrom, form.dataPickerReport, form.speaker);
		this.schedules[1].push(report);
		console.log(this.schedules);

	}
	saveAction(form) {
		let action = new Action(form.nameAction, form.timeActionTo, form.timeActionFrom, form.dataPickerAction);
		this.schedules[0].push(action);
	}

	ngOnInit() {
		this.myFormAction = this.fb.group({
			nameAction: new FormControl(''),
			timeActionFrom: new FormControl(''),
			timeActionTo: new FormControl(''),
			dataPickerAction: new FormControl(''),
		});

		this.myFormReport = this.fb.group({
			speaker: new FormControl(''),
			nameReport: new FormControl(''),
			timeReportFrom: new FormControl(''),
			timeReportTo: new FormControl(''),
			dataPickerReport: new FormControl(''),

		});
	}


	change() {
		if (this.isAction) {
			this.isValid = !(!this.myFormAction.invalid && (this.isTimeIntervalCorrect(this.myFormAction.value.timeActionFrom, this.myFormAction.value.timeActionTo)));
		} else if (this.isReport) {
			this.isValid = !(!this.myFormReport.invalid && (this.isTimeIntervalCorrect(this.myFormReport.value.timeReportFrom, this.myFormReport.value.timeReportTo)));
		} else { 
			this.isValid = true; 
		}
	}

	isTimeIntervalCorrect(timeFrom: any, timeTo: any): boolean {
		if (timeFrom && timeTo) {
			return ((timeFrom.hour < timeTo.hour) || ((timeFrom.hour === timeTo.hour) && (timeFrom.minute < timeTo.minute)));

		}
		return false;
	}


}
