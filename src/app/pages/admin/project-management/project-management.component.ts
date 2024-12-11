import {Component, ViewChild} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {NgIf, TitleCasePipe} from "@angular/common";
import {ProductsData} from "../../../models/products-data.model";
import {DialogContentComponent} from "../../modalsUi/dialog-content/dialog-content.component";
import {SelectionModel} from "@angular/cdk/collections";
import {ProjectApiService} from "../../../services/project-api.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatSort,
    MatTable,
    TitleCasePipe,
    NgIf,
    MatHeaderCellDef
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss'
})
export class ProjectManagementComponent {
  displayedColumns: string[] = ['assigned', 'name'];


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
