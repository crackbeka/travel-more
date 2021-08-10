import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularHotelsChartComponent } from './popular-hotels-chart.component';

describe('PopularHotelsChartComponent', () => {
  let component: PopularHotelsChartComponent;
  let fixture: ComponentFixture<PopularHotelsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopularHotelsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularHotelsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
