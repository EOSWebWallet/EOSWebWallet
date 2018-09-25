import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimRewardsComponent } from './claim-rewards.component';

describe('ClaimReardsComponent', () => {
  let component: ClaimRewardsComponent;
  let fixture: ComponentFixture<ClaimRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
