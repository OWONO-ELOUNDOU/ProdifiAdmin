import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTitleCard } from './virtual-title-card';

describe('VirtualTitleCard', () => {
  let component: VirtualTitleCard;
  let fixture: ComponentFixture<VirtualTitleCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VirtualTitleCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VirtualTitleCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
