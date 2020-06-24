import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarproveedoresComponent } from './registrarproveedores.component';

describe('RegistrarproveedoresComponent', () => {
  let component: RegistrarproveedoresComponent;
  let fixture: ComponentFixture<RegistrarproveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarproveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
