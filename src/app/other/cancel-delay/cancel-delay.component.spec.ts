import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelDelayComponent } from './cancel-delay.component';

describe('CancelDelayComponent', () => {
  let component: CancelDelayComponent;
  let fixture: ComponentFixture<CancelDelayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelDelayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelDelayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
