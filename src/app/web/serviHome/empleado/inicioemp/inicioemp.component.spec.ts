import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioempComponent } from './inicioemp.component';

describe('InicioempComponent', () => {
  let component: InicioempComponent;
  let fixture: ComponentFixture<InicioempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
