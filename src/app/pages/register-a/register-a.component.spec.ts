import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAComponent } from './register-a.component';

describe('RegisterAComponent', () => {
  let component: RegisterAComponent;
  let fixture: ComponentFixture<RegisterAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
