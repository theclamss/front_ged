import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {NgIf, TitleCasePipe,CommonModule} from "@angular/common";
import {ProductsData} from "../../../models/products-data.model";
import {DialogContentComponent} from "../../modalsUi/dialog-content/dialog-content.component";
import {SelectionModel} from "@angular/cdk/collections";
import {ProjectApiService} from "../../../services/project-api.service";
import {RolesService} from "../../../services/roleService/roles.service";
import {MatDialog} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInput} from "@angular/material/input";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatOption, MatSelect} from "@angular/material/select";
import {TeamsService} from "../../../services/teamsService/teams.service";
import {Roles} from "../../../models/roles-data.model";



@Component({
  selector: 'app-project-management',

  standalone: true,
  imports: [
    CommonModule,
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
    MatHeaderCellDef,
    MatIcon,
    MatFormField,
    MatCheckbox,
    MatMenu,
    MatMenuTrigger,
    MatButton,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatSelect,
    MatOption,
    FormsModule,
    MatMenuItem,
    MatIconButton
  ],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.scss',

})
export class ProjectManagementComponent {



  dataSource: MatTableDataSource<ProductsData> = new MatTableDataSource<ProductsData>();

  selectedElement: ProductsData | null = null;

  showForm = false;
  projectForm: FormGroup;
  teamMembers: any[] = [];
  selectedMembers: any[] = [];
  roles: Roles[] = []; // Utilisez un tableau pour stocker les rôles


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.projectApiService.fetchAndStoreTopProjects();
    this.projectApiService.getTopProjects().subscribe(data => this.dataSource.data = data);

    this.teamsService.getTeamMembers().subscribe((members: any[]) => {
      this.teamMembers = members;
    });


    this.rolesService.getRoles().subscribe((roles: Roles[]) => {
      this.roles = roles; // Stockez les rôles dans le tableau
    });

    this.projectForm.get('teamMembers')?.valueChanges.subscribe(selected => {
      this.selectedMembers = selected.map((id: any) => {
        return { ...this.teamMembers.find(member => member.id === id), role: '' };
      });
    });




  }

  onRowClick(row: ProductsData) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: row
    });
  }


  onSubmit() {
    if (this.projectForm.valid) {
      this.projectApiService.addProject(this.projectForm.value).subscribe(response => {
        // Handle successful response
        this.showForm = false;
        // Optionally, refresh the list of projects
      }, error => {
        // Handle error response
      });
    }
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





  recentFiles = [
    { name: 'Dashboard tech requirements', size: '220 KB', type: 'docx', icon: 'description' },
    { name: 'Q4_2023 Reporting', size: '1.2 MB', type: 'pdf', icon: 'picture_as_pdf' },
    { name: 'FY_2022-23 Financials', size: '628 KB', type: 'xls', icon: 'table_chart' },
  ];

  allFiles = [
    { name: 'Dashboard tech requirements', size: '220 KB', uploadedBy: 'Amélie Laurent', lastModified: 'Jan 4, 2024' },
    { name: 'Marketing site requirements', size: '488 KB', uploadedBy: 'Ammar Foley', lastModified: 'Jan 6, 2024' },
    { name: 'Q4_2023 Reporting', size: '1.2 MB', uploadedBy: 'Amélie Laurent', lastModified: 'Jan 5, 2024' },
    { name: 'Q3_2023 Reporting', size: '1.3 MB', uploadedBy: 'Sienna Hewitt', lastModified: 'Jan 6, 2024' },
  ];

  displayedColumns = ['name', 'size', 'uploadedBy', 'modified', 'actions'];





constructor(private fb: FormBuilder ,private rolesService: RolesService,private teamsService: TeamsService,private projectApiService: ProjectApiService, public dialog: MatDialog) {
  this.projectForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    storage: new FormControl(''),
    teamMembers: new FormControl([]),
    roles: new FormArray([]), // Utilisez un FormArray pour les rôles
  });

}
}
