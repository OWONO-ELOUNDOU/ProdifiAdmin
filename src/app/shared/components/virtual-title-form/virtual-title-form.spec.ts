import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTitleForm } from './virtual-title-form';

describe('VirtualTitleForm', () => {
  let component: VirtualTitleForm;
  let fixture: ComponentFixture<VirtualTitleForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTitleForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualTitleForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
