import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterProducerComponent } from './voter-producer.component';

describe('VoterProducerComponent', () => {
  let component: VoterProducerComponent;
  let fixture: ComponentFixture<VoterProducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterProducerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
