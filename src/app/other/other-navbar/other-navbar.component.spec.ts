import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherNavbarComponent } from './other-navbar.component';

describe('OtherNavbarComponent', () => {
  let component: OtherNavbarComponent;
  let fixture: ComponentFixture<OtherNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
