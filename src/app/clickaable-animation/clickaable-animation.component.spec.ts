import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickaableAnimationComponent } from './clickaable-animation.component';

describe('ClickaableAnimationComponent', () => {
  let component: ClickaableAnimationComponent;
  let fixture: ComponentFixture<ClickaableAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClickaableAnimationComponent]
    });
    fixture = TestBed.createComponent(ClickaableAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
