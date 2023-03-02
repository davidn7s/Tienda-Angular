import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VientoMetalComponent } from './viento-metal.component';

describe('VientoMetalComponent', () => {
  let component: VientoMetalComponent;
  let fixture: ComponentFixture<VientoMetalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VientoMetalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VientoMetalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
