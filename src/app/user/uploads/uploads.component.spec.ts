import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsComponent } from './uploads.component';

describe('UploadsComponent', () => {
  let component: UploadsComponent;
  let fixture: ComponentFixture<UploadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadsComponent]
    });
    fixture = TestBed.createComponent(UploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
