import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveProducerComponent } from './remove-producer.component';

describe('RemoveProducerComponent', () => {
  let component: RemoveProducerComponent;
  let fixture: ComponentFixture<RemoveProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
