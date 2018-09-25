import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkPermissionComponent } from './link-permission.component';

describe('LinkPermissionComponent', () => {
  let component: LinkPermissionComponent;
  let fixture: ComponentFixture<LinkPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
