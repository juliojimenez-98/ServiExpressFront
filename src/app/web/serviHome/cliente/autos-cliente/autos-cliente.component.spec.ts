import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosClienteComponent } from './autos-cliente.component';

describe('AutosClienteComponent', () => {
  let component: AutosClienteComponent;
  let fixture: ComponentFixture<AutosClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutosClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
