import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProdComponent } from './update-prod.component';

describe('UpdateProdComponent', () => {
  let component: UpdateProdComponent;
  let fixture: ComponentFixture<UpdateProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
