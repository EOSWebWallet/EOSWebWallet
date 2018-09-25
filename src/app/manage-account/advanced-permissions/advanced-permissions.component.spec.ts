import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedPermissionsComponent } from './advanced-permissions.component';

describe('AdvancedPermissionsComponent', () => {
  let component: AdvancedPermissionsComponent;
  let fixture: ComponentFixture<AdvancedPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
