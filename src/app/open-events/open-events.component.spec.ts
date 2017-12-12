import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenEventsComponent } from './open-events.component';

describe('OpenEventsComponent', () => {
  let component: OpenEventsComponent;
  let fixture: ComponentFixture<OpenEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
