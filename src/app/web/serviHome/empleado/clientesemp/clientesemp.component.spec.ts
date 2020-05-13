import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesempComponent } from './clientesemp.component';

describe('ClientesempComponent', () => {
  let component: ClientesempComponent;
  let fixture: ComponentFixture<ClientesempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientesempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
