import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameBindsBarComponent } from './name-binds-bar.component';

describe('transactionBarComponent', () => {
  let component: NameBindsBarComponent;
  let fixture: ComponentFixture<NameBindsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameBindsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameBindsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
