import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrikeIconComponent } from './strike-icon.component';

describe('StrikeIconComponent', () => {
  let component: StrikeIconComponent;
  let fixture: ComponentFixture<StrikeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrikeIconComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrikeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
