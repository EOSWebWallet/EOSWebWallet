import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProducerComponent } from './register-producer.component';

describe('RegisterProducerComponent', () => {
  let component: RegisterProducerComponent;
  let fixture: ComponentFixture<RegisterProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
