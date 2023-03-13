import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleComponentComponent } from './google.component.component';

describe('GoogleComponentComponent', () => {
  let component: GoogleComponentComponent;
  let fixture: ComponentFixture<GoogleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GoogleComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
