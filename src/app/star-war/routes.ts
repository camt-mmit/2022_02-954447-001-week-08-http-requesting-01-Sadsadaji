import { Route } from "@angular/router";
import { PeopleListPageComponent } from "./router/people/people-list-page/people-list-page.component";
import { PersonViewPageComponent } from "./router/people/person-view-page/person-view-page.component";
import { SpecieListPageComponent } from "./router/specie/specie-list-page/specie-list-page.component";
import { SpecieViewPageComponent } from "./router/specie/specie-view-page/specie-view-page.component";
import { StarWarComponent } from "./router/star-war/star-war.component";

export const routes: Route[] = [
  {
  path: '', component: StarWarComponent,
  children: [
  { path: '', redirectTo: 'people', pathMatch: 'full' },
  { path: 'people', component: PeopleListPageComponent },
  { path: 'people/:id', component: PersonViewPageComponent },
  { path: 'species', component: SpecieListPageComponent },
  { path: 'species/:id', component: SpecieViewPageComponent },
  ],
  },
  ];
