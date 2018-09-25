import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRamComponent } from './set-ram.component';

describe('SetRamComponent', () => {
  let component: SetRamComponent;
  let fixture: ComponentFixture<SetRamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetRamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
