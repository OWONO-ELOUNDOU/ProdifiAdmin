import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTopupsTable } from './wallet-topups-table';

describe('WalletTopupsTable', () => {
  let component: WalletTopupsTable;
  let fixture: ComponentFixture<WalletTopupsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletTopupsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletTopupsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
