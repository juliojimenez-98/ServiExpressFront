import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibosempComponent } from './recibosemp.component';

describe('RecibosempComponent', () => {
  let component: RecibosempComponent;
  let fixture: ComponentFixture<RecibosempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecibosempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecibosempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
