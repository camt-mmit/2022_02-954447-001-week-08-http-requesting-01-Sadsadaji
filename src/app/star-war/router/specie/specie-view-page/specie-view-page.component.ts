import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Specie } from 'src/app/star-war/models';
import { SpeciesServiceService } from 'src/app/star-war/services/species-service.service';
import { ActivatedRoute } from '@angular/router';
import { SpeciesViewComponent } from 'src/app/star-war/specie/species-view/species-view.component';

@Component({
  selector: 'star-war-specie-view-page',
  standalone: true,
  imports: [CommonModule, SpeciesViewComponent],
  templateUrl: './specie-view-page.component.html',
  styleUrls: ['./specie-view-page.component.scss']
})
export class SpecieViewPageComponent {
  protected readonly data$:Observable<Specie>;
  constructor(
    private readonly dataService: SpeciesServiceService,
    private readonly route: ActivatedRoute,
    ) {this.data$ = this.route.params.pipe(
        switchMap((params) => this.dataService.get(params['id'])),
    );
  }

  protected back(): void {
    history.back();
  }
}
