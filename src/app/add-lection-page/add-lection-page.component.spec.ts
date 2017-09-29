import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLectionPageComponent } from './add-lection-page.component';

describe('AddLectionPageComponent', () => {
  let component: AddLectionPageComponent;
  let fixture: ComponentFixture<AddLectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
