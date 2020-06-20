import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaPedidosAdminComponent } from './vista-pedidos-admin.component';

describe('VistaPedidosAdminComponent', () => {
  let component: VistaPedidosAdminComponent;
  let fixture: ComponentFixture<VistaPedidosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistaPedidosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaPedidosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
