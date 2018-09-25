import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPrivilegeComponent } from './set-privilege.component';

describe('SetPrivilegeComponent', () => {
  let component: SetPrivilegeComponent;
  let fixture: ComponentFixture<SetPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
