import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccProfileComponent } from './acc-profile.component';

describe('AccProfileComponent', () => {
  let component: AccProfileComponent;
  let fixture: ComponentFixture<AccProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
