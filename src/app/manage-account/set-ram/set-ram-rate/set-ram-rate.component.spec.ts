import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRamRateComponent } from './set-ram-rate.component';

describe('SetRamRateComponent', () => {
  let component: SetRamRateComponent;
  let fixture: ComponentFixture<SetRamRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRamRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRamRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
