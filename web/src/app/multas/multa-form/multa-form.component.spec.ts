import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultaFormComponent } from './multa-form.component';

describe('MultaFormComponent', () => {
  let component: MultaFormComponent;
  let fixture: ComponentFixture<MultaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
