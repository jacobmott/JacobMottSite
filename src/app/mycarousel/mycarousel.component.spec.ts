import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycarouselComponent } from './mycarousel.component';

describe('MycarouselComponent', () => {
  let component: MycarouselComponent;
  let fixture: ComponentFixture<MycarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
