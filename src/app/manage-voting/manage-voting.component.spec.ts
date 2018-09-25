import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVotingComponent } from './manage-voting.component';

describe('ManageVotingComponent', () => {
  let component: ManageVotingComponent;
  let fixture: ComponentFixture<ManageVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
