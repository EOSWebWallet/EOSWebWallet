import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResignProxyComponent } from './resign-proxy.component';

describe('ResignProxyComponent', () => {
  let component: ResignProxyComponent;
  let fixture: ComponentFixture<ResignProxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResignProxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResignProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
