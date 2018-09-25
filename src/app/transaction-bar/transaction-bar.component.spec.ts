import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionBarComponent } from './transaction-bar.component';

describe('transactionBarComponent', () => {
  let component: TransactionBarComponent;
  let fixture: ComponentFixture<TransactionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
