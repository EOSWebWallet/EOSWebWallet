import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSliderComponent } from './nav-bar-slider.component';

describe('NavBarSliderComponent', () => {
  let component: NavBarSliderComponent;
  let fixture: ComponentFixture<NavBarSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
