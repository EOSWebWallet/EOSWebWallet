import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingDialogComponent } from './sending-dialog.component';

describe('SendingDialogComponent', () => {
  let component: SendingDialogComponent
  let fixture: ComponentFixture<SendingDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendingDialogComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SendingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
