import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProxyInfoComponent } from './register-proxy-info.component';

describe('RegisterProxyInfoComponent', () => {
  let component: RegisterProxyInfoComponent;
  let fixture: ComponentFixture<RegisterProxyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterProxyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterProxyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
