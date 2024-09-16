import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultasCreateComponent } from './multas-create.component';

describe('MultasCreateComponent', () => {
  let component: MultasCreateComponent;
  let fixture: ComponentFixture<MultasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultasCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
