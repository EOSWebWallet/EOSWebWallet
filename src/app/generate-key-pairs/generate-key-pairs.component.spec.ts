import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateKeyPairsComponent } from './generate-key-pairs.component';

describe('GenerateKeyPairsComponent', () => {
  let component: GenerateKeyPairsComponent;
  let fixture: ComponentFixture<GenerateKeyPairsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateKeyPairsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateKeyPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
