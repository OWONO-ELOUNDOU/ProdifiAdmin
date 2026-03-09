import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawalForm } from './withdrawal-form';

describe('WithdrawalForm', () => {
  let component: WithdrawalForm;
  let fixture: ComponentFixture<WithdrawalForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrawalForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawalForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
