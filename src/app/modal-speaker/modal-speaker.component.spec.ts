import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSpeakerComponent } from './modal-speaker.component';

describe('ModalSpeakerComponent', () => {
  let component: ModalSpeakerComponent;
  let fixture: ComponentFixture<ModalSpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSpeakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSpeakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
