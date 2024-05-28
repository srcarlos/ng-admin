import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyActivityComponent } from './dummy-activity.component';

describe('DummyActivityComponent', () => {
  let component: DummyActivityComponent;
  let fixture: ComponentFixture<DummyActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DummyActivityComponent]
    });
    fixture = TestBed.createComponent(DummyActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
