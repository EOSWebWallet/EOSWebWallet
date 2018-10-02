import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ChangeLastNetworkDialogComponent } from './change-last-network-dialog.component'

describe('SelectAccountDialogComponent', () => {
  let component: ChangeLastNetworkDialogComponent
  let fixture: ComponentFixture<ChangeLastNetworkDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLastNetworkDialogComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLastNetworkDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
