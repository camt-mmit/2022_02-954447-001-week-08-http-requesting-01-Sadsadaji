import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { List, SearchData, Specie } from 'src/app/star-war/models';
import { SpeciesServiceService } from 'src/app/star-war/services/species-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeciesListComponent } from 'src/app/star-war/specie/species-list/species-list.component';

@Component({
  selector: 'star-war-specie-list-page',
  standalone: true,
  imports: [CommonModule , SpeciesListComponent],
  templateUrl: './specie-list-page.component.html',
  styleUrls: ['./specie-list-page.component.scss']
})
export class SpecieListPageComponent {
  protected readonly data$: Observable<List<Specie>>;

  protected searchData: SearchData;

  constructor(
    dataService: SpeciesServiceService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    //this.data$ = dataService.getAll({ page: '3' });
    console.debug(dataService)
    this.searchData = route.snapshot.queryParams;
    this.data$ = route.queryParams.pipe(
      switchMap((params) => {
        console.debug(params);
        return dataService.getAll(params);
      }),
    );
  }

  protected search(searchData: SearchData): void {
    this.router.navigate([], {
      queryParams: searchData,
    });
  }

  protected onItemSelect(item: Specie): void {
    if(item.url) {
      const paths = item.url.pathname.split('/');
      const id = paths[paths.length - 2];

      this.router.navigate([id],{
        relativeTo: this.route,
      }
        );

    }
  }
}
