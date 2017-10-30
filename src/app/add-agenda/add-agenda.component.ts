import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CropperComponent } from '../cropper-event/cropper.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Action } from '../module_ts/action';
import { Report } from '../module_ts/report';

@Component({
	selector: 'app-add-agenda',
	templateUrl: './add-agenda.component.html',
	styleUrls: [
		'./add-agenda.component.scss',
	]
})


export class AddAgendaComponent implements OnInit {

	logoCamera: string = '/assets/images/camera.png';
	isReport: boolean = true;
	isAction: boolean = false;
	myFormAction: FormGroup;
	myFormReport: FormGroup;
	isValid: boolean = true;
	minDate: object = {};
	maxDate: object = {};

	time = { hour: '09', minute: '00' };
	timeReport = { hour: '09', minute: '00' };
	schedules: Array<Action[]> = [[]];
	@Input() selectData: Array<any>;
	modelDateRepor: object = {};
	modelDate: object = {};

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
		this.setDate(this.selectData);
	}

	saveReport(form) {
		let report = new Report(form.nameReport, form.timeReportFrom, form.timeReportTo, form.dataPickerReport, form.speaker);
		if (this.schedules.length === 1) {
			this.schedules[this.schedules.length - 1].push(report);
		} else if (this.schedules.length > 1) {
			this.addElementsToSchedules(report);
		}

	}

	saveAction(form) {
		let action = new Action(form.nameAction, form.timeActionFrom, form.timeActionTo, form.dataPickerAction);
		if (this.schedules.length === 1) {
			this.schedules[this.schedules.length - 1].push(action);
		} else if (this.schedules.length > 1) {
			this.addElementsToSchedules(action);
		}
	}

	addElementsToSchedules(item: any) {
		for (let i = 0; i < this.schedules.length; i++) {
			if (this.schedules[i].length == 0) {
				this.schedules[i].push(item);
				return;
			}
			for (let j = 0; j < this.schedules[i].length; j++) {
				let schedulDate = this.schedules[i][j]['date'];
				if (item.date.day == schedulDate['day']) {
					this.schedules[i].push(item);
					return;
				}
			}
		}
	}

	ngOnInit() {
		this.myFormAction = this.fb.group({
			nameAction: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
			timeActionFrom: new FormControl(''),
			timeActionTo: new FormControl(''),
			dataPickerAction: new FormControl(''),
		});

		this.myFormReport = this.fb.group({
			nameReport: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
			timeReportFrom: new FormControl(''),
			timeReportTo: new FormControl(''),
			dataPickerReport: new FormControl(''),
			speaker: new FormControl('', [Validators.required]),

		});

		this.setDate(this.selectData);
	}

	setDate(selectDate: any) {
		if (selectDate.length === 1) {
			let date = { year: selectDate[0].year, month: selectDate[0].month, day: selectDate[0].day };
			this.modelDateRepor = date;
			this.modelDate = date;
			this.minDate = date;
			this.maxDate = date;
			this.schedules.length = 1;

		}
		if (selectDate.length > 1) {
			this.minDate = { year: selectDate[0].year, month: selectDate[0].month, day: selectDate[0].day };
			this.modelDate = this.minDate;
			this.modelDateRepor = this.minDate;
			this.maxDate = { year: selectDate[selectDate.length - 1].year, month: selectDate[selectDate.length - 1].month, day: selectDate[selectDate.length - 1].day };;
			let datesConference = this.numberOfDays(selectDate);
			let arrays = this.addArrays(datesConference + 1);
			this.schedules = arrays;
		}
	}
	addArrays(n) {
		let arr = [];
		for (let i = 0; i < n; i++) {
			arr.push([]);
		}
		return arr;
	}


	numberOfDays(selectDate: any): number {
		let dateOne = new Date(selectDate[0].year, selectDate[0].month - 1, selectDate[0].day);
		let dateEnd = new Date(selectDate[selectDate.length - 1].year, selectDate[selectDate.length - 1].month - 1, selectDate[selectDate.length - 1].day);
		let differenceDays = Math.floor((dateEnd.valueOf() - dateOne.valueOf()) / 86400000);
		return differenceDays;
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

	@Output() isHideAgenda = new EventEmitter<boolean>();
	hideAgenda(increased) {
		this.isHideAgenda.emit(increased);
	}

}
