import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropperLocationComponent } from './cropper-location.component';

describe('CropperLocationComponent', () => {
  let component: CropperLocationComponent;
  let fixture: ComponentFixture<CropperLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropperLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropperLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
