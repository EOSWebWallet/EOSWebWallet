import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractWithContractComponent } from './interact-with-contract.component';

describe('InteractWithContractComponent', () => {
  let component: InteractWithContractComponent;
  let fixture: ComponentFixture<InteractWithContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractWithContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractWithContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
