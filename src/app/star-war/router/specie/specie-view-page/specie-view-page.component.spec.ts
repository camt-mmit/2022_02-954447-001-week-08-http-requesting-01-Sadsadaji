import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieViewPageComponent } from './specie-view-page.component';

describe('SpecieViewPageComponent', () => {
  let component: SpecieViewPageComponent;
  let fixture: ComponentFixture<SpecieViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpecieViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecieViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
