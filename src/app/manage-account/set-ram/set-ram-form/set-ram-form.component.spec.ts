import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRamFormComponent } from './set-ram-form.component';

describe('SetRamFormComponent', () => {
  let component: SetRamFormComponent;
  let fixture: ComponentFixture<SetRamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRamFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
