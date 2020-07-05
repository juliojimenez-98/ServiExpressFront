import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoEmpComponent } from './pago-emp.component';

describe('PagoEmpComponent', () => {
  let component: PagoEmpComponent;
  let fixture: ComponentFixture<PagoEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
