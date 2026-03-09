import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupForm } from './topup-form';

describe('TopupForm', () => {
  let component: TopupForm;
  let fixture: ComponentFixture<TopupForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopupForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopupForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
