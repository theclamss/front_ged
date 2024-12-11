import {AfterViewInit, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import { ProjectApiService } from '../../services/project-api.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,

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
import {DialogContentComponent} from "../modalsUi/dialog-content/dialog-content.component";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ProjectComponent implements AfterViewInit{
  displayedColumns: string[] = ['assigned', 'name', 'priority', 'budget'];

  dataSource: MatTableDataSource<ProductsData> = new MatTableDataSource<ProductsData>();

  selectedElement: ProductsData | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.projectApiService.fetchAndStoreTopProjects();
    this.projectApiService.getTopProjects().subscribe(data => this.dataSource.data = data);

  }

  onRowClick(row: ProductsData) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: row
    });
    }



  selection = new SelectionModel<any>(true, []); // true pour multi-sélection

  /** Vérifie si tous les éléments sont sélectionnés */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Sélectionne ou désélectionne toutes les lignes */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** Sélectionne ou désélectionne une ligne individuelle */
  toggleRow(row: any) {
    this.selection.toggle(row);
  }






  constructor(private projectApiService: ProjectApiService, public dialog: MatDialog) {};
}
