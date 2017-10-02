import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfService} from '../conf-service';
import * as firebase from 'firebase';
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
  lection.speakerPhoto = this.file.name;
  this.lections.push(lection);
  // console.log(this.file);
}
submit(lections: Array<Lection>) {
  let storageRef = firebase.storage().ref();
  let metadata = {
    contentType: this.file.type
  }; 
  let uploadTask = storageRef.child('images/speakers/').child(this.file.name).put(this.file, metadata);
  this.confService.addLections(this.lections);
}
  ngOnInit() {
  }

}
