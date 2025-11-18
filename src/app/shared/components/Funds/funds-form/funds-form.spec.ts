import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsForm } from './funds-form';

describe('FundsForm', () => {
  let component: FundsForm;
  let fixture: ComponentFixture<FundsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
