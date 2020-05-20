import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoReservaComponent } from './progreso-reserva.component';

describe('ProgresoReservaComponent', () => {
  let component: ProgresoReservaComponent;
  let fixture: ComponentFixture<ProgresoReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresoReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
