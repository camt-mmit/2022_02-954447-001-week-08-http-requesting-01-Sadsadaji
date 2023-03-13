import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecieListPageComponent } from './specie-list-page.component';

describe('SpecieListPageComponent', () => {
  let component: SpecieListPageComponent;
  let fixture: ComponentFixture<SpecieListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ SpecieListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecieListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
