import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverTextComponent } from './cover-text.component';

describe('CoverTextComponent', () => {
  let component: CoverTextComponent;
  let fixture: ComponentFixture<CoverTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoverTextComponent]
    });
    fixture = TestBed.createComponent(CoverTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
