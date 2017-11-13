import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewSpeakerComponent } from './modal-view-speaker.component';

describe('ModalViewSpeakerComponent', () => {
  let component: ModalViewSpeakerComponent;
  let fixture: ComponentFixture<ModalViewSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
