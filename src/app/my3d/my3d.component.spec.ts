import { ComponentFixture, TestBed } from '@angular/core/testing';

import { My3dComponent } from './my3d.component';

describe('My3dComponent', () => {
  let component: My3dComponent;
  let fixture: ComponentFixture<My3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ My3dComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(My3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
