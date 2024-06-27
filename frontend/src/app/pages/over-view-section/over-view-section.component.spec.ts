import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverViewSectionComponent } from './over-view-section.component';

describe('OverViewSectionComponent', () => {
  let component: OverViewSectionComponent;
  let fixture: ComponentFixture<OverViewSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverViewSectionComponent]
    });
    fixture = TestBed.createComponent(OverViewSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
