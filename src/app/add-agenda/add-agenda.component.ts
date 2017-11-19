import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { CropperComponent } from '../cropper-event/cropper.component';
import { BrowserModule, DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { NgbModule, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { SpeakerService } from '../services/speaker/speaker.service';
import { AgendaService } from '../services/agenda/agenda.service';
import { EventService } from '../services/event/event.service';
import { Event } from '../module_ts/event';
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
	@Input() currentEvent: Event;
	@Output() isHideAgenda = new EventEmitter<boolean>();
	model1 = "";
	arrays;


	autocompleListFormatter = (speaker: any): SafeHtml => {
		let html = `<span>${speaker.fullName}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}

	constructor(private formbuild: FormBuilder, config: NgbTimepickerConfig, 
		private _sanitizer: DomSanitizer, private speakerService: SpeakerService, 
		private agendaService: AgendaService, private eventService: EventService) {
		config.spinners = false;
	}

	ngOnInit() {
		this.myFormAction = this.formbuild.group({
			nameAction: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(55)]),
			timeActionFrom: new FormControl('', [Validators.required]),
			timeActionTo: new FormControl('', [Validators.required]),
			dataPickerAction: new FormControl(''),
		});

		this.myFormReport = this.formbuild.group({
			nameReport: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(55)]),
			timeReportFrom: new FormControl('', [Validators.required]),
			timeReportTo: new FormControl('', [Validators.required]),
			dataPickerReport: new FormControl(''),
			speaker: new FormControl('', [Validators.required]),

		});

		this.setDate(this.selectDate);
		this.getAllSpeakers();
		this.eventService.saveEvent(null);
	}

	//TODO validation times
	// isTimesIntervalCorrect(timeFrom: any, timeTo: any) {
	// 	return (group: FormGroup) => {
	// 		let from = group.controls[timeFrom];
	// 		let to = group.controls[timeTo];
	// 		if (this.mapObjectTimeToMinutes(from) >= this.mapObjectTimeToMinutes(to)) {
	// 			return {
	// 				invalidTime: true
	// 			};
	// 		}
	// 	}
	// }

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
		// if (typeof (form.speaker) === 'string') {
		// 	const check = (obj) => { 
		// 		return obj.fullName === form.speaker;
		// 	}
		// 	const speakerIndex = this.speakers.findIndex(check);
		// 	form.speaker = this.speakers[speakerIndex];
		// 	console.log(form.speaker);
		// }
		let report = new Report(form.nameReport, this.convertObjectToTime(form.timeReportFrom), this.convertObjectToTime(form.timeReportTo), this.convertObjectToDate(form.dataPickerReport), form.speaker);

		if (this.schedules.length === 1) {
			if (this.addElementsToSchedulesByTime(report, this.schedules[0])) {
				this.agendaService.saveReport(report);
			}
		} else if (this.schedules.length > 1) {
			if (this.addElementsToSchedulesByDate(report)) {
				this.agendaService.saveReport(report);
			}
		}
	}

	saveAction(form) {
		let action = new Action(form.nameAction, this.convertObjectToTime(form.timeActionFrom), this.convertObjectToTime(form.timeActionTo), this.convertObjectToDate(form.dataPickerAction));

		if (this.schedules.length === 1) {
			if (this.addElementsToSchedulesByTime(action, this.schedules[0])) {
				this.agendaService.saveAction(action);
			}
		} else if (this.schedules.length > 1) {
			if (this.addElementsToSchedulesByDate(action)) {
				this.agendaService.saveAction(action);
			}
		}

	}

	addElementsToSchedulesByDate(item: Action) {
		for (let i = 0; i < this.schedules.length; i++) {
			if (this.schedules[i].length == 0) {
				this.schedules[i].push(item);
				this.resetSomevauesForms();
				return true;
			}
			for (let j = 0; j < this.schedules[i].length; j++) {
				let schedulDate = this.schedules[i][j]['date'];
				if (item.date.getDate() == schedulDate.getDate()) {
					return this.addElementsToSchedulesByTime(item, this.schedules[i]);
				}
			}
		}
	}

	addElementsToSchedulesByTime(item: Action, schedules: Action[]) {
		if (schedules.length == 0) {
			schedules.push(item);
			this.resetSomevauesForms();
			return true;
		}
		if (this.mapObjectTimeToMinutes(item['endTime']) <= this.mapObjectTimeToMinutes(schedules[0]['startTime'])) {
			schedules.unshift(item);
			this.resetSomevauesForms();
			return true;
		}
		if (this.mapObjectTimeToMinutes(item['startTime']) >= this.mapObjectTimeToMinutes(schedules[schedules.length - 1]['endTime'])) {
			schedules.push(item);
			this.resetSomevauesForms();
			return true;
		}
		if (this.isTimeItemMoreTimeSchedule(schedules, item)) {
			return true;
		}
		swal('The entered time is not correct!', 'Please enter correct time', 'error');
		return false;
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
		return false;
	}

	convertObjectToDate(item) {
		return new Date(item['year'], item['month'] - 1, item['day']);
	}

	convertObjectToTime(item) {
		return item.hour + ':' + item.minute;

	}

	mapObjectTimeToMinutes(time) {
		let arrTime = time.split(':');
		return (Number(arrTime[0]) * 60 + Number(arrTime[1]));
	}

	setDate(selectDate: any) {
		if (selectDate.length === 1) {
			let date = { year: selectDate[0].year, month: selectDate[0].month, day: selectDate[0].day };
			this.modelDateRepor = date;
			this.modelDate = date;
			this.minDate = date;
			this.maxDate = date;
			this.arrays = this.addArrays(1);
		}
		if (selectDate.length > 1) {
			this.minDate = { year: selectDate[0].year, month: selectDate[0].month, day: selectDate[0].day };
			this.modelDate = this.minDate;
			this.modelDateRepor = this.minDate;
			this.maxDate = { year: selectDate[selectDate.length - 1].year, month: selectDate[selectDate.length - 1].month, day: selectDate[selectDate.length - 1].day };
			let datesConference = this.numberOfDays(selectDate);
			this.arrays = this.addArrays(datesConference + 1);
		}
		this.schedules = this.arrays;
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
			this.isValid = !(!this.myFormAction.invalid && (this.isTimeIntervalCorrect(this.convertObjectToTime(this.myFormAction.value.timeActionFrom), this.convertObjectToTime(this.myFormAction.value.timeActionTo))));
		} else if (this.isReport) {
			this.isValid = !(!this.myFormReport.invalid && (this.isTimeIntervalCorrect(this.convertObjectToTime(this.myFormReport.value.timeReportFrom), this.convertObjectToTime(this.myFormReport.value.timeReportTo))));
		} else {
			this.isValid = true;
		}
	}

	isTimeIntervalCorrect(timeFrom: any, timeTo: any): boolean {
		if (timeFrom && timeTo) {
			if(this.mapObjectTimeToMinutes(timeFrom) < this.mapObjectTimeToMinutes(timeTo) === false){
				swal('The interval of time is not correct!', 'Please enter correct time', 'error');
				return false;
			}
			return true;
		}
		return false;
	}

	hideAgenda(increased) {
		this.isHideAgenda.emit(increased);
		// delete me please
		this.agendaService.deleteAction();
		console.log("Deleting all item is done!");
		//
	}

	getAllSpeakers() {
		this.speakerService.getAllSpeakers().subscribe(speakers => {
			this.speakers = [];
			speakers.forEach(speaker => {
				let currentSpeaker = new Speaker(speaker.full_name, speaker.description,
					speaker.placework, speaker.position, speaker.photo);
				currentSpeaker.id = speaker.id;
				this.speakers.push(currentSpeaker);
			});
		});
	}

	getAllAction() {
		this.agendaService.getAllAgenda().subscribe(agenda => {
			// this.schedules = this.arrays;
			agenda.forEach(element => {
				if (element['speaker_id'] === null) {
					let currentAction = new Action(element['tittle'], element['start_time'], element['end_time'], element['date'], element['id']);
				} else {
					let currentReport = new Report(element['tittle'], element['start_time'], element['end_time'], element['date'], element['speaker_id'], element['id']);
				}
			});
		});
		console.log('ok');
	}

	addedSpeaker(speaker) {
		if (!speaker) { return; }
		this.speakers.push(speaker);
		// this.model1 = speaker.fullName;
	}

	saveEvent() {
		this.agendaService.saveAgenda(this.schedules);
		this.eventService.saveEvent(this.event);
	}

}
