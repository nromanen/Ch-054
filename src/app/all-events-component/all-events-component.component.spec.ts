import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEventsComponentComponent } from './all-events-component.component';

describe('AllEventsComponentComponent', () => {
  let component: AllEventsComponentComponent;
  let fixture: ComponentFixture<AllEventsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllEventsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEventsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
