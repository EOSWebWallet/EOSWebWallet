import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProxyComponent } from './create-proxy.component';

describe('CreateProxyComponent', () => {
  let component: CreateProxyComponent;
  let fixture: ComponentFixture<CreateProxyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProxyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProxyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
