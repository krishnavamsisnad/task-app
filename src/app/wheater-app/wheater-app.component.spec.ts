import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheaterAppComponent } from './wheater-app.component';

describe('WheaterAppComponent', () => {
  let component: WheaterAppComponent;
  let fixture: ComponentFixture<WheaterAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheaterAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheaterAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
