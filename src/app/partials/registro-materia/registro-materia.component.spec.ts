import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroMateriaComponent } from './registro-materia.component';

describe('RegistroMateriaComponent', () => {
  let component: RegistroMateriaComponent;
  let fixture: ComponentFixture<RegistroMateriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroMateriaComponent]
    });
    fixture = TestBed.createComponent(RegistroMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
