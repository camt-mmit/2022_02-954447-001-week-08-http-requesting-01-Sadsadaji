import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesListComponent } from './species-list.component';

describe('SpeciesListComponent', () => {
  let component: SpeciesListComponent;
  let fixture: ComponentFixture<SpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpeciesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
