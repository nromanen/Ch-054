import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfService} from '../conf-service';
import {Lection} from '../lection';

@Component({
  selector: 'app-add-lection-page',
  templateUrl: './add-lection-page.component.html',
  styleUrls: ['./add-lection-page.component.scss']
})
export class AddLectionPageComponent implements OnInit {
  lection = new Lection;
  addLectionForm: FormGroup;
  constructor(private router: Router, private confService: ConfService, private fb: FormBuilder) {
this.createForm();
}
createForm() {
  this.addLectionForm = this.fb.group(({
    name: new FormControl(''),
    descr: new FormControl(''),
    time: new FormControl(''),
    speaker: new FormControl('')
  }));
}
save(addLectionForm: FormGroup) {
  this.lection.lectionDescr = addLectionForm.value.descr;
  this.lection.lectionName = addLectionForm.value.name;
  this.lection.lectionSpeaker = addLectionForm.value.speaker;
  this.lection.lectionTime = addLectionForm.value.time;
  this.confService.addLection(this.lection);
}
  ngOnInit() {
  }

}
