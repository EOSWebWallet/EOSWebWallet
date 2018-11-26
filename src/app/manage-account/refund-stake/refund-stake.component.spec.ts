import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundStakeComponent } from './refund-stake.component';

describe('RefundStakeComponent', () => {
  let component: RefundStakeComponent;
  let fixture: ComponentFixture<RefundStakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundStakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundStakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
