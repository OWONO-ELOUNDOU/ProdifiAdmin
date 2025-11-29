import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletBalanceCard } from './wallet-balance-card';

describe('WalletBalanceCard', () => {
  let component: WalletBalanceCard;
  let fixture: ComponentFixture<WalletBalanceCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletBalanceCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletBalanceCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
