import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletWithdrawalsTable } from './wallet-withdrawals-table';

describe('WalletWithdrawalsTable', () => {
  let component: WalletWithdrawalsTable;
  let fixture: ComponentFixture<WalletWithdrawalsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletWithdrawalsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletWithdrawalsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
