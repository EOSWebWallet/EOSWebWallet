import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { OurFeaturesComponent } from './our-features.component'

describe('GenerateKeyPairsComponent', () => {
  let component: OurFeaturesComponent;
  let fixture: ComponentFixture<OurFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OurFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OurFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
