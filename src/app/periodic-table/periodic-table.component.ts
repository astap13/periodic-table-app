import { Component, inject, OnInit } from '@angular/core';
import { PeriodicElement } from '../models/periodic-element.model';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { RxState } from '@rx-angular/state';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RxIf } from '@rx-angular/template/if';
import { PeriodicTableStateService } from './periodic-table.state';

@Component({
  selector: 'app-periodic-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RxIf,
  ],
  providers: [RxState],
  templateUrl: './periodic-table.component.html',
  styleUrls: ['./periodic-table.component.scss'],
})
export class PeriodicTableComponent implements OnInit {
  periodicTableState = inject(PeriodicTableStateService);

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  filterControl: FormControl = new FormControl('');

  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadData();
    this.setupFilter();
  }

  periodicElementData$ = this.periodicTableState.select('filteredData');
  showLoader$ = this.periodicTableState.select('showLoader');

  loadData() {
    setTimeout(() => {
      this.periodicTableState.loadData();
    }, 3000);
  }

  setupFilter() {
    this.filterControl.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((filterValue: string) => {
        this.periodicTableState.applyFilter(filterValue);
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
    this.periodicTableState.updateDataSource(updatedElement);
    this.periodicTableState.applyFilter(this.filterControl.value);
  }
}
