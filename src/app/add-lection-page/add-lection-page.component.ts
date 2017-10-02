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
  lections = Array<Lection>();
  addLectionForm: FormGroup;
  file:File;
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

change(photo){
  this.file = photo.target.files[0];
}

save(addLectionForm: FormGroup) {
  const lection = new Lection();
  lection.lectionDescr = addLectionForm.value.descr;
  lection.lectionName = addLectionForm.value.name;
  lection.lectionSpeaker = addLectionForm.value.speaker;
  lection.lectionTime = addLectionForm.value.time;
  lection.speakerPhoto = this.file;
  console.log(lection.speakerPhoto);
  this.lections.push(lection);
}
submit(lections: Array<Lection>) {
  this.confService.addLections(this.lections);
}
  ngOnInit() {
  }

}
