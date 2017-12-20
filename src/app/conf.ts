import {Lection} from './lection';
export class Conf {
    key: string;
    confName: string;
    confDescr: string;
    confDateFrom: Date;
    confDateTo: Date;
    confPhoto: string;
    confLections: Lection[];
    confphotoEventLocations: string[];
    confLocationEvent: string;
  }
