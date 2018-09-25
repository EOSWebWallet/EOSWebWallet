import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPermissionComponent } from './get-permission.component';

describe('GetPermissionComponent', () => {
  let component: GetPermissionComponent;
  let fixture: ComponentFixture<GetPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
