import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, switchMap } from 'rxjs';
import { Person } from 'src/app/star-war/models';
import { ActivatedRoute } from '@angular/router';
import { PeopleService } from 'src/app/star-war/services/people.service';
import { PersonViewComponent } from 'src/app/star-war/people/person-view/person-view.component';

@Component({
  selector: 'star-war-person-view-page',
  standalone: true,
  imports: [CommonModule, PersonViewComponent],
  templateUrl: './person-view-page.component.html',
  styleUrls: ['./person-view-page.component.scss']
})
export class PersonViewPageComponent {
  protected readonly data$:Observable<Person>;
  constructor(
    private readonly dataService: PeopleService,
    private readonly route: ActivatedRoute,
    ) {this.data$ = this.route.params.pipe(
        switchMap((params) => this.dataService.get(params['id'])),
    );
  }

  protected back(): void {
    history.back();
  }
}
