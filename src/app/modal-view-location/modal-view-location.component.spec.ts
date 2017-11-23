import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewLocationComponent } from './modal-view-location.component';

describe('ModalViewLocationComponent', () => {
  let component: ModalViewLocationComponent;
  let fixture: ComponentFixture<ModalViewLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
