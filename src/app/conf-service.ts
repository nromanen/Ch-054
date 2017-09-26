import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';
import {FormGroup} from '@angular/forms';

import {Conf} from './conf';

@Injectable()
export class ConfService {
    confs: FirebaseListObservable<any[]>;
    confArr: Conf[];
    selectedConf: Conf;
    conf = new Conf();
    constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
      this.confs = af.list('/conference', {
      });
      this.confs.subscribe();
    }
}
