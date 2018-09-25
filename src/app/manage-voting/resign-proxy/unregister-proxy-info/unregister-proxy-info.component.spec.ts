import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisterProxyInfoComponent } from './unregister-proxy-info.component';

describe('UnregisterProxyInfoComponent', () => {
  let component: UnregisterProxyInfoComponent;
  let fixture: ComponentFixture<UnregisterProxyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnregisterProxyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnregisterProxyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
