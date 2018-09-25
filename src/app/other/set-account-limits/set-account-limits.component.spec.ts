import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAccountLimitsComponent } from './set-account-limits.component';

describe('SetAccountLimitsComponent', () => {
  let component: SetAccountLimitsComponent;
  let fixture: ComponentFixture<SetAccountLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetAccountLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetAccountLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
