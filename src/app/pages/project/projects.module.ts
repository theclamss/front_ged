import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './projects.routing.module';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import {ProjectComponent} from "./project.component";

@NgModule({
  declarations: [ProjectComponent],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        NgApexchartsModule,
        RouterModule.forChild(PagesRoutes),
        TablerIconsModule.pick(TablerIcons),

    ],
  exports: [TablerIconsModule],
})
export class ProjectsModule {}
