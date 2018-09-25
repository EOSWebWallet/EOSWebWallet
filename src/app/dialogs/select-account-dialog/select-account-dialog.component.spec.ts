import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccountDialogComponent } from './select-account-dialog.component';

describe('SelectAccountDialogComponent', () => {
  let component: SelectAccountDialogComponent;
  let fixture: ComponentFixture<SelectAccountDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAccountDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
