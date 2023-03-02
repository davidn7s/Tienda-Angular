import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianosComponent } from './pianos.component';

describe('PianosComponent', () => {
  let component: PianosComponent;
  let fixture: ComponentFixture<PianosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PianosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PianosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
