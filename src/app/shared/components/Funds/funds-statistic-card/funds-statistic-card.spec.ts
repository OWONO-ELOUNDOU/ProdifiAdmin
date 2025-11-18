import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsStatisticCard } from './funds-statistic-card';

describe('FundsStatisticCard', () => {
  let component: FundsStatisticCard;
  let fixture: ComponentFixture<FundsStatisticCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsStatisticCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundsStatisticCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
