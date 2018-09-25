import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlinkPermissionComponent } from './unlink-permission.component';

describe('UnlinkPermissionComponent', () => {
  let component: UnlinkPermissionComponent;
  let fixture: ComponentFixture<UnlinkPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnlinkPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlinkPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
