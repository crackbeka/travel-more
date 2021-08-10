import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsChartComponent } from './reservations-chart.component';

describe('ReservationsChartComponent', () => {
  let component: ReservationsChartComponent;
  let fixture: ComponentFixture<ReservationsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
