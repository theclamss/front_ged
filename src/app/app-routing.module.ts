import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import {ProjectComponent} from "./pages/project/project.component";
import { RoleManagementComponent } from './pages/admin/role-management/role-management.component';
import { UserManagementComponent } from './pages/admin/user-management/user-management.component';
import { ProjectManagementComponent } from './pages/admin/project-management/project-management.component';
import { FileManagementComponent } from './pages/admin/file-management/file-management.component';
import {AdminGuard} from "./guards/admin.guard";
//import { AdminGuard } from './guards/admin.guard'; // à implémenter


const routes: Routes = [

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'projects',
        loadChildren: () =>
          import('./pages/project/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
    ],
  },
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AdminGuard], // Vérification du token admin
    children: [
      {
        path: 'rolesM',
        component: RoleManagementComponent, // Gestion des rôles
      },
      {
        path: 'usersM',
        component: UserManagementComponent, // Gestion des utilisateurs
      },
      {
        path: 'projectsM',
        component: ProjectManagementComponent, // Gestion des projets
      },
      {
        path: 'filesM',
        component: FileManagementComponent, // Gestion des fichiers
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
