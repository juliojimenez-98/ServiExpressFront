import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosNComponent } from './servicios-n.component';

describe('ServiciosNComponent', () => {
  let component: ServiciosNComponent;
  let fixture: ComponentFixture<ServiciosNComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosNComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
