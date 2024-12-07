import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { ProjectApiService } from '../../services/project-api.service';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
// Check if the module '../../services/project-api.service' exports 'productsData' and export it if not.
import { ProductsData } from '../../models/products-data.model';
import {MatPaginator} from "@angular/material/paginator";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFabButton, MatMiniFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatSort} from "@angular/material/sort";
import {NgApexchartsModule} from "ng-apexcharts";
import {NgForOf, NgIf, TitleCasePipe} from "@angular/common";
import {TablerIconsModule} from "angular-tabler-icons";
import {Observable} from "rxjs";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  standalone: true,
  imports: [
    MatTable,
    MatPaginator,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatMiniFabButton,
    MatOption,
    MatRow,
    MatRowDef,
    MatSelect,
    MatSort,
    NgApexchartsModule,
    NgForOf,
    TablerIconsModule,
    TitleCasePipe,
    NgIf,
    MatHeaderCellDef
  ]
})
export class ProjectComponent implements AfterViewInit{
  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];

  dataSource: MatTableDataSource<ProductsData> = new MatTableDataSource<ProductsData>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.projectApiService.fetchAndStoreTopProjects();
    this.projectApiService.getTopProjects().subscribe(data => this.dataSource.data = data);
    console.log("zebi" +this.dataSource.data);
  }

  constructor(private projectApiService: ProjectApiService) {};
}
