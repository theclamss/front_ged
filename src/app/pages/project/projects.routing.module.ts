import { Routes } from '@angular/router';

import {ProjectComponent} from "./project.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: ProjectComponent,
    data: {
      title: 'Projects Page',
    },
  }
];
