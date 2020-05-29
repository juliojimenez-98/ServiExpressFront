import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroAutoComponent } from './registro-auto.component';

describe('RegistroAutoComponent', () => {
  let component: RegistroAutoComponent;
  let fixture: ComponentFixture<RegistroAutoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroAutoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
