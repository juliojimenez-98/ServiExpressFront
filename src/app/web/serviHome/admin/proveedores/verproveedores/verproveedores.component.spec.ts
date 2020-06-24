import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerproveedoresComponent } from './verproveedores.component';

describe('VerproveedoresComponent', () => {
  let component: VerproveedoresComponent;
  let fixture: ComponentFixture<VerproveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerproveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerproveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
