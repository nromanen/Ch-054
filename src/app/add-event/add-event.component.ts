import { Component, OnInit } from '@angular/core';
import {FormsModule, FormGroup, FormControl, Validators} from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
	selector: 'app-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
	logoCamera: string = '/assets/images/camera.png';
	isShowCalendarTo: boolean = false;
	isShowButton: boolean = true;

//autocomplete
	model1 = "USA";
	arrayOfStrings: string[] =
	["Central Park West, New York, NY 10023, USA", "60 E 65th St, New York, NY 10065, USA", "Time Warner Center, 10 Columbus Cir, New York, NY 10023, USA", "900 Canada Pl, Vancouver, BC V6C 3L5, Canada", "101 Trans-Canada Hwy, Duncan, BC V9L 3P8, Canada", "999 Canada Pl #410, Vancouver, BC V6C 3E1, Canada",];
	myForm: FormGroup;
	myCallback(newVal) {
		this.model1 = newVal;
	}

	addCalendar() {
		this.isShowCalendarTo = true;
		this.isShowButton = false;
		console.log(this.isShowCalendarTo);
	}

	deleteCalendar() {
		this.isShowCalendarTo = false;
		this.isShowButton = true;
	}


	constructor() {
		this.myForm = new FormGroup({
		name: new FormControl(),
		descr: new FormControl(),
		dataPickerFrom: new FormControl(),
		dataPickerTo: new FormControl(),
		location: new FormControl()
	});
	}

	ngOnInit() {
	}

}
