import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeployAbiComponent } from './deploy-abi.component';

describe('DeployAbiComponent', () => {
  let component: DeployAbiComponent;
  let fixture: ComponentFixture<DeployAbiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeployAbiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeployAbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
