import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CropperComponent } from '../cropper-event/cropper.component';

@Component({
	selector: 'app-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
	width: number = 500;
	height: number = 260;
	cropperSettingsWidth: number = 1080;
	cropperSettingsHeight: number = 540;
	logoCamera: string = '/assets/images/camera.png';
	isShowCalendarTo: boolean = false;
	isShowButton: boolean = true;
	isShowIcon: boolean = false;
	imgEvent: any;
	now = new Date();
	minDateFrom = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
	minDateTo: object;
	modelFrom: object = {};
	modelDate: object = {};
	isSelectedCalendar: boolean = true;
	temporaryStorageFromDate: object;

	//autocomplete
	model = '';
	arrayOfStrings: string[] =
	["Central Park West, New York, NY 10023, USA", "60 E 65th St, New York, NY 10065, USA", "Time Warner Center, 10 Columbus Cir, New York, NY 10023, USA", "900 Canada Pl, Vancouver, BC V6C 3L5, Canada", "101 Trans-Canada Hwy, Duncan, BC V9L 3P8, Canada", "999 Canada Pl #410, Vancouver, BC V6C 3E1, Canada",];
	myForm: FormGroup;

	myCallback(newVal) {
		this.model = newVal;
	}

	selectToday() {
		this.modelFrom = this.minDateFrom;
	}

	selectedDateFrom(event) {
		let mydate = new Date(event['year'], event['month'] - 1, event['day']);
		this.minDateTo = { year: mydate.getFullYear(), month: mydate.getMonth() + 1, day: mydate.getDate() };
		this.modelDate = this.minDateTo;
		if (Object.keys(event).length != 0) {
			this.isSelectedCalendar = false;
		}
		this.temporaryStorageFromDate = this.minDateTo;
	}


	addCalendar() {
		let control: FormControl = new FormControl('');
		this.isShowCalendarTo = true;
		this.isShowButton = false;
		this.isShowIcon = true;
		if (this.temporaryStorageFromDate) {
			this.myForm.addControl('dataPickerTo', control)
			this.modelDate = this.temporaryStorageFromDate;
		}
	}

	deleteCalendar() {
		this.isShowCalendarTo = false;
		this.isShowButton = true;
		this.isShowIcon = false;
		this.myForm.removeControl('dataPickerTo');
		this.modelDate = {};
	}


	constructor(private fb: FormBuilder) {
		this.myForm = this.fb.group({
			name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
			descr: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
			dataPickerFrom: new FormControl('', [Validators.required]),
			dataPickerTo: '',
			location: new FormControl('', [Validators.required]),
			ok: null,
			photoEvent: this.fb.group({
				cropper: ''
			})
		});
	}

	onChanged(imgCrop) {

	}

	

	saveEvent(form) {
		console.log(form);
	}


	ngOnInit() {


	}

}
