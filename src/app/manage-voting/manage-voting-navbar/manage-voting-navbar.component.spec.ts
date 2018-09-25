import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVotingNavbarComponent } from './manage-voting-navbar.component';

describe('ManageVotingNavbarComponent', () => {
  let component: ManageVotingNavbarComponent;
  let fixture: ComponentFixture<ManageVotingNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVotingNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVotingNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
