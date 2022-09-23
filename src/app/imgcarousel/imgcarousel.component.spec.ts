import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgcarouselComponent } from './imgcarousel.component';

describe('ImgcarouselComponent', () => {
  let component: ImgcarouselComponent;
  let fixture: ComponentFixture<ImgcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImgcarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
