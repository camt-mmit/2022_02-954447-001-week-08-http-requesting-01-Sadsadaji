import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesViewComponent } from './species-view.component';

describe('SpeciesViewComponent', () => {
  let component: SpeciesViewComponent;
  let fixture: ComponentFixture<SpeciesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpeciesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
