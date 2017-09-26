import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfService} from '../conf-service';

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {

  addForm: FormGroup;
  constructor(private router: Router, private confService: ConfService, private fb: FormBuilder) {
this.createForm();
}
createForm() {
  this.addForm = this.fb.group(({
    name: new FormControl(''),
    descr: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl('')
  }));
}
save(addForm: FormGroup) {
  this.confService.addConf(addForm);
}
  ngOnInit() {
  }

}
