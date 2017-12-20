import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventPageComponent } from './add-event-page.component';
import { EventPhoto }  from '../modul_ts/event-photo'

describe('AddEventPageComponent', () => {
  let component: AddEventPageComponent;
  let fixture: ComponentFixture<AddEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEventPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
