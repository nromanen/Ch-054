import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { CropperComponent } from '../cropper-event/cropper.component';
import { Event } from '../module_ts/event';

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
	isShowAgenda: boolean = false;
	isShowEvent: boolean = true;
	selectData: Array<any> = new Array();
	photo: string = '';
	event: Event;
	isSowSelectLocat: boolean = false;

	//autocomplete

	model = '';
	locations =
	[{
		country: 'USA',
		city: 'NY',
		address: 'Central Park',
		photos: [['one', 'https://static1.squarespace.com/static/53f64d96e4b0516302f7d140/t/59541796414fb5b3cecca501/1498924986573/Photo+Booth+Rental+In+Baltimore+Maryland?format=300w'],
		 ['two', 'https://static1.squarespace.com/static/53f64d96e4b0516302f7d140/t/59541796414fb5b3cecca501/1498924986573/Photo+Booth+Rental+In+Baltimore+Maryland?format=300w']]
	}, {
		country: 'Ukraine',
		city: 'Lviv',
		address: 'Golovna, 31',
		photos: [['one', 'https://static1.squarespace.com/static/53f64d96e4b0516302f7d140/t/59541796414fb5b3cecca501/1498924986573/Photo+Booth+Rental+In+Baltimore+Maryland?format=300w'], ['two', 'https://static1.squarespace.com/static/53f64d96e4b0516302f7d140/t/59541796414fb5b3cecca501/1498924986573/Photo+Booth+Rental+In+Baltimore+Maryland?format=300w']]
	}
	];
	myForm: FormGroup;

	myValueFormatter(location: any): string {
		return `${location.country},${location.city},${location.address}`;
	}

	autocompleListFormatter = (location: any): SafeHtml => {
		let html = `<span>${location.country},${location.city},${location.address}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}

	myCallback(newVal) {
		this.model = newVal;
	}

	selectToday() {
		this.modelFrom = this.minDateFrom;
	}

	selectedDateFrom(event) {
		let mydate = new Date(event['year'], event['month'] - 1, event['day']);
		this.minDateTo = { year: mydate.getFullYear(), month: mydate.getMonth() + 1, day: mydate.getDate() };
		this.modelDate = { year: mydate.getFullYear(), month: mydate.getMonth() + 1, day: mydate.getDate() + 1 };
		if (Object.keys(event).length != 0) {
			this.isSelectedCalendar = false;
		}
		this.temporaryStorageFromDate = this.modelDate;
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


	constructor(private fb: FormBuilder, private _sanitizer: DomSanitizer) { }

	onChanged(imgCrop) {
		this.photo = imgCrop.image;
	}



	saveEvent(form) {
		this.event = new Event(form.name, form.descr, form.dataPickerFrom, form.location, form.dataPickerTo, this.photo);
		if (!form.dataPickerTo && form.dataPickerFrom) {
			this.selectData.push(form.dataPickerFrom);
		}
		if (form.dataPickerFrom && form.dataPickerTo) {
			this.selectData.push(form.dataPickerFrom, form.dataPickerTo);
		}
		this.isShowAgenda = true;
		this.isShowEvent = false;
	}


	ngOnInit() {
		this.myForm = this.fb.group({
			name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
			descr: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
			dataPickerFrom: new FormControl('', [Validators.required]),
			dataPickerTo: '',
			location: new FormControl('', [Validators.required])
		});
	}

	isHideAgenda(increased) {
		this.isShowAgenda = increased;
		this.isShowEvent = !increased;
		if (this.isShowEvent) {
			this.myForm.reset();
			this.modelFrom = {};
			this.modelDate = {};
		}
	}

	showSelectLocation(show) {
		this.isSowSelectLocat = show;
	}
}

