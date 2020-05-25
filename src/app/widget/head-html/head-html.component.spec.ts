import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadHtmlComponent } from './head-html.component';

describe('HeadHtmlComponent', () => {
  let component: HeadHtmlComponent;
  let fixture: ComponentFixture<HeadHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
