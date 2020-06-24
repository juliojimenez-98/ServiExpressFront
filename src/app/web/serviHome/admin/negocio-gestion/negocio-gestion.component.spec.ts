import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocioGestionComponent } from './negocio-gestion.component';

describe('NegocioGestionComponent', () => {
  let component: NegocioGestionComponent;
  let fixture: ComponentFixture<NegocioGestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegocioGestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocioGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
