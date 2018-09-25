import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAccountNavbarComponent } from './manage-account-navbar.component';

describe('ManageAccountNavbarComponent', () => {
  let component: ManageAccountNavbarComponent;
  let fixture: ComponentFixture<ManageAccountNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAccountNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAccountNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
