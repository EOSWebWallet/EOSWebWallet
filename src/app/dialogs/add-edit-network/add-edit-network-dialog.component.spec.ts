import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { AddEditNetworkDialogComponent } from './add-edit-network-dialog.component'

describe('SelectAccountDialogComponent', () => {
  let component: AddEditNetworkDialogComponent
  let fixture: ComponentFixture<AddEditNetworkDialogComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditNetworkDialogComponent ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNetworkDialogComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
