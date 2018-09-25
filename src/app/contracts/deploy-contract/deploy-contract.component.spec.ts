import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployContractComponent } from './deploy-contract.component';

describe('DeployContractComponent', () => {
  let component: DeployContractComponent;
  let fixture: ComponentFixture<DeployContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
