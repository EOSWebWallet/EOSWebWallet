import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellRamComponent } from './sell-ram.component';

describe('SellRamComponent', () => {
  let component: SellRamComponent;
  let fixture: ComponentFixture<SellRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
