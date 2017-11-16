import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CropperComponent } from '../cropper-event/cropper.component';
import { BrowserModule, DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgbModule, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { SpeakerService } from '../services/speaker/speaker.service';
import { AgendaService } from '../services/agenda/agenda.service';
import { Action } from '../module_ts/action';
import { Report } from '../module_ts/report';
import { Speaker } from '../module_ts/speaker'
declare var swal: any;

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
	modelDateRepor: object = {};
	modelDate: object = {};
	schedules: Array<Action[]> = [[]];
	speakers: Speaker[] = [];
	@Input() selectDate: Array<any>;
	@Output() isHideAgenda = new EventEmitter<boolean>();
	model1 = "";


	autocompleListFormatter = (speaker: any): SafeHtml => {
		let html = `<span>${speaker.fullName}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}

	constructor(private formbuild: FormBuilder, config: NgbTimepickerConfig, private _sanitizer: DomSanitizer, private SpeakerService: SpeakerService, private AgendaService: AgendaService) {
		config.spinners = false;
	}

	ngOnInit() {
		this.myFormAction = this.formbuild.group({
			nameAction: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]),
			timeActionFrom: new FormControl('', [Validators.required]),
			timeActionTo: new FormControl('', [Validators.required]),
			dataPickerAction: new FormControl(''),
		});

		this.myFormReport = this.formbuild.group({
			nameReport: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]),
			timeReportFrom: new FormControl(''),
			timeReportTo: new FormControl(''),
			dataPickerReport: new FormControl(''),
			speaker: new FormControl('', [Validators.required]),

		});

		this.setDate(this.selectDate);
		this.getAllSpeakers();
	}

	//TODO validation times
	isTimesIntervalCorrect(timeFrom: any, timeTo: any) {
		return (group: FormGroup) => {
			let from = group.controls[timeFrom];
			let to = group.controls[timeTo];
			if (this.mapObjectTimeToMinutes(from) >= this.mapObjectTimeToMinutes(to)) {
				return {
					invalidTime: true
				};
			}
		}
	}

	resetSomevauesForms() {
		this.isValid = true;
		this.myFormAction.patchValue({ nameAction: '', timeActionFrom: '', timeActionTo: '' });
		this.myFormReport.patchValue({ nameReport: '', timeReportFrom: '', timeReportTo: '', speaker: '' });
	}

	changeSelect() {
		this.isAction = !this.isAction;
		this.isReport = !this.isReport;
		this.resetSomevauesForms();
	}

	saveReport(form) {
		let report = new Report(form.nameReport, form.timeReportFrom, form.timeReportTo, this.convertObjectToDate(form.dataPickerReport), form.speaker);
		if (this.schedules.length === 1) {
			this.addElementsToSchedulesByTime(report, this.schedules[0]);
		} else if (this.schedules.length > 1) {
			this.addElementsToSchedulesByDate(report);
		}
	}

	saveAction(form) {
		let action = new Action(form.nameAction, form.timeActionFrom, form.timeActionTo, this.convertObjectToDate(form.dataPickerAction));
		console.log(this.convertObjectToTime(form.timeActionTo));
		if (this.schedules.length === 1) {
			this.addElementsToSchedulesByTime(action, this.schedules[0]);
		} else if (this.schedules.length > 1) {
			this.addElementsToSchedulesByDate(action);
		}
	}

	addElementsToSchedulesByDate(item: any) {
		for (let i = 0; i < this.schedules.length; i++) {
			if (this.schedules[i].length == 0) {
				this.schedules[i].push(item);
				this.resetSomevauesForms();
				return;
			}
			for (let j = 0; j < this.schedules[i].length; j++) {
				let schedulDate = this.schedules[i][j]['date'];
				if (item.date.getDate() == schedulDate.getDate()) {
					this.addElementsToSchedulesByTime(item, this.schedules[i]);
					return;
				}
			}
		}
	}

	addElementsToSchedulesByTime(item: any, schedules: Action[]) {
		if (schedules.length == 0) {
			schedules.push(item);
			this.resetSomevauesForms();
			return;
		}
		if (this.mapObjectTimeToMinutes(item['endTime']) <= this.mapObjectTimeToMinutes(schedules[0]['startTime'])) {
			schedules.unshift(item);
			this.resetSomevauesForms();
			return;
		}
		if (this.mapObjectTimeToMinutes(item['startTime']) >= this.mapObjectTimeToMinutes(schedules[schedules.length - 1]['endTime'])) {
			schedules.push(item);
			this.resetSomevauesForms();
			return;
		}
		if (this.isTimeItemMoreTimeSchedule(schedules, item)) {
			return;
		}
		swal('The entered time is not correct!', 'Please enter correct time', 'error');
	}

	isTimeItemMoreTimeSchedule(schedules, item) {
		for (let i = 0; i < schedules.length - 1; i++) {
			let itemStartTime = this.mapObjectTimeToMinutes(item['startTime']);
			let itemEndTime = this.mapObjectTimeToMinutes(item['endTime']);
			let scheduleEndTime = this.mapObjectTimeToMinutes(schedules[i]['endTime']);
			let nextScheduleStartTime = this.mapObjectTimeToMinutes(schedules[i + 1]['startTime']);
			if (itemStartTime >= scheduleEndTime && itemEndTime <= nextScheduleStartTime) {
				schedules.splice(i + 1, 0, item);
				this.resetSomevauesForms();
				return true;
			}
		}
	}

	convertObjectToDate(item) {
		return new Date(item['year'], item['month']-1, item['day']);
	}
	
	convertObjectToTime(item) {
		let str = item.hour + ':' + item.minute;
	}

	mapObjectTimeToMinutes(time) {
		return (time.hour * 60 + (time.minute * 1));
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
			this.maxDate = { year: selectDate[selectDate.length - 1].year, month: selectDate[selectDate.length - 1].month, day: selectDate[selectDate.length - 1].day };
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
			return (this.mapObjectTimeToMinutes(timeFrom) < this.mapObjectTimeToMinutes(timeTo));
		}
		return false;
	}

	hideAgenda(increased) {
		this.isHideAgenda.emit(increased);
	}

	getAllSpeakers() {
		this.SpeakerService.getAllSpeakers().subscribe(speakers => {
			this.speakers = [];
			speakers.forEach(speaker => {
				let currentSpeaker = new Speaker(speaker.full_name, speaker.description,
					speaker.placework, speaker.position, speaker.photo);
				currentSpeaker.id = speaker.id;
				this.speakers.push(currentSpeaker);
			});
		});
	}

	addedSpeaker(speaker) {
		if (!speaker) { return; }
		this.speakers.push(speaker);
	}

	saveEvent() {
	
		this.AgendaService.saveAgenda(this.schedules);
	}

}
