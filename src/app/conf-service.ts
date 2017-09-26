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
    selectConf(conf: Conf) {
      this.selectedConf = conf;
    }
    addConf(addForm: FormGroup) {
      this.conf.confName = addForm.value.name;
      this.conf.confDescr = addForm.value.descr;
      this.conf.confDateFrom = addForm.value.dateFrom;
      this.conf.confDateTo = addForm.value.dateTo;
      this.confs.push(this.conf);
    }
    updateConf(key: string, editForm: FormGroup) {
      this.conf.confName = editForm.value.name;
      this.conf.confDescr = editForm.value.descr;
      this.confs.update(key, this.conf);
    }

    deleteConf(key: string) {
      this.confs.remove(key);
    }
}
