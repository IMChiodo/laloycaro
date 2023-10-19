import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TinderListComponent } from './tinder-list.component';

describe('DescriptionComponent', () => {
  let component: TinderListComponent;
  let fixture: ComponentFixture<TinderListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TinderListComponent],
    });
    fixture = TestBed.createComponent(TinderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
