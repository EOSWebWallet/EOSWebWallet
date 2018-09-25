import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetGlobalLimitsComponent } from './set-global-limits.component';

describe('SetGlobalLimitsComponent', () => {
  let component: SetGlobalLimitsComponent;
  let fixture: ComponentFixture<SetGlobalLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetGlobalLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetGlobalLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
