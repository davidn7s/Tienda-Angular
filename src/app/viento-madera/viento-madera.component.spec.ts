import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VientoMaderaComponent } from './viento-madera.component';

describe('VientoMaderaComponent', () => {
  let component: VientoMaderaComponent;
  let fixture: ComponentFixture<VientoMaderaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VientoMaderaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VientoMaderaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
