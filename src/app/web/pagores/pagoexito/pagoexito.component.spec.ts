import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoexitoComponent } from './pagoexito.component';

describe('PagoexitoComponent', () => {
  let component: PagoexitoComponent;
  let fixture: ComponentFixture<PagoexitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoexitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoexitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
