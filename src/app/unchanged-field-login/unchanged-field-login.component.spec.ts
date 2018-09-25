import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnchangedFieldLoginComponent } from './unchanged-field-login.component';

describe('UnchangedFieldLoginComponent', () => {
  let component: UnchangedFieldLoginComponent;
  let fixture: ComponentFixture<UnchangedFieldLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnchangedFieldLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnchangedFieldLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
