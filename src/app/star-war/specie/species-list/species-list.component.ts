import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List, SearchData, Specie } from '../../models';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'star-war-species-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss']
})
export class SpeciesListComponent implements OnInit{
  @Input() data!: List<Specie>;
  @Input() search?: SearchData;

  @Output() searchChange = new EventEmitter<SearchData>();
  @Output() itemSelected = new EventEmitter<Specie>();

  protected formGroup!: FormGroup<{
    search: FormControl<string>;
  }>;

  private fb: NonNullableFormBuilder;

  constructor(fb: FormBuilder) {
    this.fb = fb.nonNullable;
  }

  ngOnInit(): void {
    console.debug(this.data);
    if (!this.data) {
      throw new Error(`Property 'data' is required!`);
    }

    this.formGroup = this.fb.group({
      search: this.search?.search ?? '',
    });
  }

  protected get pageOffset(): number {
    return (+(this.search?.page ?? 1) - 1) * 10;
  }

  protected doSearch(): void {
    const value = this.formGroup.value;

    if (value.search) {
      this.searchChange.emit(this.formGroup.value);
    } else {
      this.doClear();
    }
  }

  protected doClear(): void {
    this.formGroup.setValue({ search: '' });
    this.searchChange.emit({});
  }

  protected changePage(searchParams?: URLSearchParams): void {
    const search = searchParams?.get('search');
    const page = searchParams?.get('page');

    const searchData = {
      ...(search ? { search } : {}),
      ...(page ? { page } : {}),
    };

    this.searchChange.emit(searchData);
  }

  protected doSelect(item: Specie): void {
      this.itemSelected.emit(item);
  }
}
