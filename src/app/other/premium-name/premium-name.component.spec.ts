import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumNameComponent } from './premium-name.component';

describe('PremiumNameComponent', () => {
  let component: PremiumNameComponent;
  let fixture: ComponentFixture<PremiumNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
