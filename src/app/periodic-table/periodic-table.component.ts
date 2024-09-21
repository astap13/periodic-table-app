import { Component, inject, OnInit } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    ReactiveFormsModule,
  ],
  providers: [RxState],
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
  constructor(
    private state: RxState<{ periodicElementData: PeriodicElement[] }>
  ) {}

  ngOnInit(): void {
    this.state.set({ periodicElementData: this.ELEMENT_DATA });
    this.loadData(this.ELEMENT_DATA);
    this.setupFilter();
  }

  periodicElementData$ = this.state.select('periodicElementData');

  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  dataSource!: MatTableDataSource<PeriodicElement, MatPaginator>;

  showLoader: boolean = true;

  filterControl: FormControl = new FormControl('');

  readonly dialog = inject(MatDialog);

  loadData(data: PeriodicElement[]) {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(data);
      this.showLoader = false;
    }, 3000);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setupFilter() {
    this.filterControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.applyFilter(filterValue);
      });
  }

  openEditDialog(elementData: PeriodicElement) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...elementData },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateDataSource(result);
      }
    });
  }

  updateDataSource(updatedElement: PeriodicElement): void {
    const updatedData = this.dataSource.data.map((element) =>
      element.position === updatedElement.position ? updatedElement : element
    );
    this.dataSource.data = updatedData;
  }
}
