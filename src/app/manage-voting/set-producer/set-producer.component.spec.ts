import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetProducerComponent } from './set-producer.component';

describe('SetProducerComponent', () => {
  let component: SetProducerComponent;
  let fixture: ComponentFixture<SetProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
