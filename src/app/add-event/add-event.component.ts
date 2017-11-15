import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { CropperComponent } from '../cropper-event/cropper.component';
import { Event } from '../module_ts/event';
import { LocationService } from '../services/location/location.service';

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
	photo: string = '';
	imgEvent: any;
	now = new Date();
	minDateFrom = { year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate() };
	minDateTo: object = {};
	modelFrom: object = {};
	modelDateTo: object = {};
	temporaryStorageFromDate: object;
	isShowCalendarTo: boolean = false;
	isShowButton: boolean = true;
	isShowIcon: boolean = false;
	isSelectedCalendar: boolean = true;
	isShowAgenda: boolean = false;
	isShowEvent: boolean = true;
	isValidPhoto: boolean = true;
	isSowSelectLocat: boolean = false;
	selectDate: Array<any> = new Array();
	event: Event;
	myForm: FormGroup;
	locations: Array<Location>;

	myValueFormatter(location: any): string {
		return `${location.country},${location.city},${location.address}`;
	}

	autocompleListFormatter = (location: any): SafeHtml => {
		let html = `<span>${location.country},${location.city},${location.address}</span>`;
		return this._sanitizer.bypassSecurityTrustHtml(html);
	}


	constructor(private formbuild: FormBuilder, private _sanitizer: DomSanitizer, private locationService: LocationService) { }
	

	ngOnInit() {
		this.myForm = this.formbuild.group({
			name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]),
			descr: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
			dataPickerFrom: new FormControl('', [Validators.required]),
			dataPickerTo: '',
			location: new FormControl('', [Validators.required])
		});
		this.getAllLocations();
	}

	selectToday() {
		this.modelFrom = this.minDateFrom;
	}

	selectedDateFrom(event) {
		this.minDateTo = { year: event['year'], month: event['month'], day: event['day'] };
		this.modelDateTo = { year: event['year'], month: event['month'], day: event['day'] + 1 };
		if (Object.keys(event).length != 0) {
			this.isSelectedCalendar = false;
		}
		this.temporaryStorageFromDate = this.modelDateTo;
	}

	addCalendar() {
		let control: FormControl = new FormControl('');
		this.isShowCalendarTo = true;
		this.isShowButton = false;
		this.isShowIcon = true;
		if (this.temporaryStorageFromDate) {
			this.myForm.addControl('dataPickerTo', control)
			this.modelDateTo = this.temporaryStorageFromDate;
		}
	}

	deleteCalendar() {
		this.isShowCalendarTo = false;
		this.isShowButton = true;
		this.isShowIcon = false;
		this.myForm.removeControl('dataPickerTo');
		this.modelDateTo = {};
	}

	onChanged(imgCrop) {
		this.photo = imgCrop.image;
		this.isValidPhoto = false;
	}

	saveEvent(form) {
		this.event = new Event(form.name, form.descr, form.dataPickerFrom, form.location, form.dataPickerTo, this.photo);
		if (!form.dataPickerTo && form.dataPickerFrom) {
			this.selectDate.push(form.dataPickerFrom);
		}
		if (form.dataPickerFrom && form.dataPickerTo) {
			this.selectDate.push(form.dataPickerFrom, form.dataPickerTo);
		}
		this.isShowAgenda = true;
		this.isShowEvent = false;
	}

	isHideAgenda(increased) {
		this.isShowAgenda = increased;
		this.isShowEvent = !increased;
		if (this.isShowEvent) {
			this.isValidPhoto = true;
			this.isSowSelectLocat = false;
		}
	}

	showSelectLocation() {
		this.isSowSelectLocat = !this.isSowSelectLocat;
	}

	getAllLocations() {
		this.locationService.getAllLocations().subscribe(locations => {
			locations.forEach(location => {
				this.locationService.getLocationPhotos(location.id).subscribe(photos => {
					location.photos = [];
					location.photos.push(['one', photos.shift().photo]);
					location.photos.push(['two', photos.shift().photo]);
					this.locations.push(location);
				});
			});
		});
	}
}
