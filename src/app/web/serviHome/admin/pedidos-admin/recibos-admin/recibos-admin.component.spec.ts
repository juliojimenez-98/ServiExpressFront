import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibosAdminComponent } from './recibos-admin.component';

describe('RecibosAdminComponent', () => {
  let component: RecibosAdminComponent;
  let fixture: ComponentFixture<RecibosAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibosAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
