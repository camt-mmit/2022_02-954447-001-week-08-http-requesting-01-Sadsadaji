import { Routes } from '@angular/router'

export const routes: Routes = [
  {path: '' , redirectTo: 'star-war' , pathMatch: 'full'},
  {
    path: 'star-war',
    loadChildren: () =>
      import('./app/star-war/routes').then((mod) => mod.routes),
},
{
  path: 'google',
  loadChildren:() => import('./app/google/routes').then((mod) => mod.routes),
},
];
