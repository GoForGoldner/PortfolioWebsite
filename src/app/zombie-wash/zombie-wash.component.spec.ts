import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZombieWashComponent } from './zombie-wash.component';

describe('ZombieWashComponent', () => {
  let component: ZombieWashComponent;
  let fixture: ComponentFixture<ZombieWashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZombieWashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZombieWashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
