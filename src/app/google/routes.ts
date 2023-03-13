import { Route } from '@angular/router';
import { RequireTokenComponent } from './router/require-token/require-token.component';

import { AuthorizationPageComponent } from './router/authorization-page/authorization-page.component';
import { GoogleComponentComponent } from './router/google/google.component/google.component.component';
import { EventsListPageComponent } from './router/events/events-list-page/events-list-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: GoogleComponentComponent,
    children: [
      {
        path: '',
        component: RequireTokenComponent,
        children: [{ path: 'events', component: EventsListPageComponent }],
      },
      { path: 'authorization', component: AuthorizationPageComponent },
    ],
  },
];
