import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnErrorComponent } from './on-error.component';

describe('OnErrorComponent', () => {
  let component: OnErrorComponent;
  let fixture: ComponentFixture<OnErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
