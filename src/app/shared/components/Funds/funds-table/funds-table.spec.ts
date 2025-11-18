import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsTable } from './funds-table';

describe('FundsTable', () => {
  let component: FundsTable;
  let fixture: ComponentFixture<FundsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundsTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
