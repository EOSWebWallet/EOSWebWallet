import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProxyComponent } from './set-proxy.component';

describe('SetProxyComponent', () => {
  let component: SetProxyComponent;
  let fixture: ComponentFixture<SetProxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
