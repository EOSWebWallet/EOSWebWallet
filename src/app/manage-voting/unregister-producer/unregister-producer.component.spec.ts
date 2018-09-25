import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterProducerComponent } from './unregister-producer.component';

describe('UnregisterProducerComponent', () => {
  let component: UnregisterProducerComponent;
  let fixture: ComponentFixture<UnregisterProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
