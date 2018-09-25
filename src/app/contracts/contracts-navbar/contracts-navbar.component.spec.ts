import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsNavbarComponent } from './contracts-navbar.component';

describe('ContractsNavbarComponent', () => {
  let component: ContractsNavbarComponent;
  let fixture: ComponentFixture<ContractsNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractsNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
