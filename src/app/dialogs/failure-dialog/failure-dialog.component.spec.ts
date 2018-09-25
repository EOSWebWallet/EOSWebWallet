import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureDialogComponent } from './failure-dialog.component';

describe('FailureDialogComponent', () => {
  let component: FailureDialogComponent;
  let fixture: ComponentFixture<FailureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
