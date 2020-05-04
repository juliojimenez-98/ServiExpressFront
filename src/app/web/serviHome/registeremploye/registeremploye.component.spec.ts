import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteremployeComponent } from './registeremploye.component';

describe('RegisteremployeComponent', () => {
  let component: RegisteremployeComponent;
  let fixture: ComponentFixture<RegisteremployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteremployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteremployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
