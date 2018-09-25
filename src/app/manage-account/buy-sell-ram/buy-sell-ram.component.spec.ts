import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySellRamComponent } from './buy-sell-ram.component';

describe('BuySellRamComponent', () => {
  let component: BuySellRamComponent;
  let fixture: ComponentFixture<BuySellRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySellRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySellRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
