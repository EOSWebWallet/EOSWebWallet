import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnchangedFieldComponent } from './unchanged-field.component';

describe('UnchangedFieldComponent', () => {
  let component: UnchangedFieldComponent;
  let fixture: ComponentFixture<UnchangedFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnchangedFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnchangedFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
