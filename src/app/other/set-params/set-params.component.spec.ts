import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetParamsComponent } from './set-params.component';

describe('SetParamsComponent', () => {
  let component: SetParamsComponent;
  let fixture: ComponentFixture<SetParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
