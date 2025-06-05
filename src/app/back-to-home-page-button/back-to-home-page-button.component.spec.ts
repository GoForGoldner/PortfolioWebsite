import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackToHomePageButtonComponent } from './back-to-home-page-button.component';

describe('BackToHomePageButtonComponent', () => {
  let component: BackToHomePageButtonComponent;
  let fixture: ComponentFixture<BackToHomePageButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackToHomePageButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackToHomePageButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
