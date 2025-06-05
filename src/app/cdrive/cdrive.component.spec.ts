import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CDriveComponent } from './cdrive.component';

describe('CDriveComponent', () => {
  let component: CDriveComponent;
  let fixture: ComponentFixture<CDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CDriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
