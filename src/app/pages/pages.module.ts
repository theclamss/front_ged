import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PagesRoutes } from './pages.routing.module';
import { MaterialModule } from '../material.module';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [AppDashboardComponent],
    imports: [
        CommonModule,
        MaterialModule,
        MatIconModule,
        FormsModule,
        NgApexchartsModule,
        RouterModule.forChild(PagesRoutes),
        TablerIconsModule.pick(TablerIcons),

    ],
  exports: [TablerIconsModule,MatIconModule],
})
export class PagesModule {}
