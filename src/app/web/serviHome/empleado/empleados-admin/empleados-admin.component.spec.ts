import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosAdminComponent } from './empleados-admin.component';

describe('EmpleadosAdminComponent', () => {
  let component: EmpleadosAdminComponent;
  let fixture: ComponentFixture<EmpleadosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
