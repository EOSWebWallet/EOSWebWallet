import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyRamComponent } from './buy-ram.component';

describe('BuyRamComponent', () => {
  let component: BuyRamComponent;
  let fixture: ComponentFixture<BuyRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
