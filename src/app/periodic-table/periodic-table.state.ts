import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { PeriodicElement } from '../models/periodic-element.model';

export interface PeriodicTableState {
  periodicElementData: PeriodicElement[];
  filteredData: PeriodicElement[];
  showLoader: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PeriodicTableStateService extends RxState<PeriodicTableState> {
  constructor() {
    super();
    this.set({
      periodicElementData: [],
      filteredData: [],
      showLoader: true,
    });
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

  loadData() {
    this.set({
      periodicElementData: this.ELEMENT_DATA,
      filteredData: [...this.ELEMENT_DATA],
      showLoader: false,
    });
  }

  applyFilter(filterValue: string) {
    const filteredData = this.get('filteredData').filter((element) => {
      const searchTerm = filterValue.trim().toLowerCase();
      return (
        element.name.toLowerCase().includes(searchTerm) ||
        element.weight.toString().includes(searchTerm) ||
        element.symbol.toLowerCase().includes(searchTerm)
      );
    });
    this.set({ filteredData });
  }

  updateDataSource(updatedElement: PeriodicElement) {
    const updatedData = this.get('filteredData').map((element) =>
      element.position === updatedElement.position ? updatedElement : element
    );
    this.set({ filteredData: updatedData });
  }
}
