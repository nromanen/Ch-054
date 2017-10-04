import { Component, OnInit } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import { AngularFireDatabase }
from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {ConfService} from '../conf-service';
import {Conf} from '../conf';

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {
  // todos$: FirebaseListObservable<any[]>;
 
  addForm: FormGroup;
  file: File;
  photoEvent: string = "Choose file...";
  photoEventLocation: string = "Choose file...";
  // titlePhotoLocation: string = "Choose file...";
  constructor(private router: Router, private confService: ConfService, private fb: FormBuilder) {
this.createForm();
// af.list('conf');
}

change(photo) {
  this.file = photo.target.files[0];
  this.photoEvent = 'images/photo_events/' + this.file.name;
}
changeLocation(photo) {
  this.file = photo.target.files[0];
  this.photoEventLocation = 'images/location/' + this.file.name;
//   let arrPhotoFile = photo.target.files;
// for(let i = 0; i<arrPhotoFile.length;i++){this.photoEventLocation[i]=(arrPhotoFile[i].name);}
}

createForm() {
  this.addForm = this.fb.group(({
    name: new FormControl(''),
    descr: new FormControl(''),
    dateFrom: new FormControl(''),
    dateTo: new FormControl(''),
    photo: new FormControl(''),
    location: new FormControl(''),
    photoLocation: new FormControl('')

  }));
}
save(addForm: FormGroup) {
  this.confService.addConf(addForm, this.photoEvent, this.photoEventLocation);
}


  ngOnInit() {

  }

}
