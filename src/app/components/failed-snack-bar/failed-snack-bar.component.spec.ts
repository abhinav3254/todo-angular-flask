import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedSnackBarComponent } from './failed-snack-bar.component';

describe('FailedSnackBarComponent', () => {
  let component: FailedSnackBarComponent;
  let fixture: ComponentFixture<FailedSnackBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FailedSnackBarComponent]
    });
    fixture = TestBed.createComponent(FailedSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
