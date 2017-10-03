import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ConfService} from '../conf-service';
import { Location } from '@angular/common';
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
  photoSpeaker:string = "Choose file...";
  photo:string="https://firebasestorage.googleapis.com/v0/b/project-ui.appspot.com/o/images%2Fspeakers%2Fph-10.jpg?alt=media&token=3a2ae2e9-a09e-4950-9f82-ca4a8cfd84bc";
  constructor(private router: Router, private confService: ConfService, private fb: FormBuilder,  private location: Location) {
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
  this.photoSpeaker = this.file.name;
}

save(addLectionForm: FormGroup) {
  const lection = new Lection();
  lection.lectionDescr = addLectionForm.value.descr;
  lection.lectionName = addLectionForm.value.name;
  lection.lectionSpeaker = addLectionForm.value.speaker;
  lection.lectionTime = addLectionForm.value.time;
  lection.speakerPhoto = this.photoSpeaker;
  this.lections.push(lection);
  this.photoSpeaker = "Choose file...";
  // console.log(this.file);
}
downloadImg(photo){
  let pathReference = firebase.storage().ref();
  let ref = pathReference.child('images/speakers/'+ photo);
  ref.getDownloadURL().then(function(url) { this.photo = "https://firebasestorage.googleapis.com/v0/b/project-ui.appspot.com/o/images%2Fspeakers%2Fph-10.jpg?alt=media&token=3a2ae2e9-a09e-4950-9f82-ca4a8cfd84bc";
  })
}


submit(lections: Array<Lection>) {
  let storageRef = firebase.storage().ref();
  let metadata = {
    contentType: this.file.type
  }; 
  let uploadTask = storageRef.child('images/speakers/').child(this.file.name).put(this.file, metadata);
  this.confService.addLections(this.lections);
  this.goBack();
  this.downloadImg(this.file.name);
}

goBack(): void {
  this.location.back();
}

  ngOnInit() {
  }

}
