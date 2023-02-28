import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuitarraComponent } from './guitarra.component';

describe('GuitarraComponent', () => {
  let component: GuitarraComponent;
  let fixture: ComponentFixture<GuitarraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuitarraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuitarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
