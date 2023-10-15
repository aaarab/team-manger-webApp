import { Routes } from "@angular/router";
import {ErrorComponent} from "./error.component";

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    title: 'error'
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      errorMessage: 'Unauthorized Action 403'
    },
    title: 'error'
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      errorMessage: 'Page Not Found 404'
    },
    title: 'error'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
