import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { PopupNoteComponent } from './popup-note.component'

describe('GenerateKeyPairsComponent', () => {
  let component: PopupNoteComponent;
  let fixture: ComponentFixture<PopupNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
