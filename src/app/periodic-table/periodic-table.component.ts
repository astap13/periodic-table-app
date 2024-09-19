import { Component, OnInit } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
  templateUrl: './periodic-table.component.html',
  styleUrl: './periodic-table.component.scss',
})
export class PeriodicTableComponent implements OnInit {
  ngOnInit(): void {
    this.loadData(this.ELEMENT_DATA);
    this.setupFilter();
  }

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
}
