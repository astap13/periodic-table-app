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

  loadData(elements: PeriodicElement[]) {
    this.set({
      periodicElementData: elements,
      filteredData: elements,
      showLoader: false,
    });
  }

  applyFilter(filterValue: string) {
    const filteredData = this.get('periodicElementData').filter((element) => {
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
    const updatedData = this.get('periodicElementData').map((element) =>
      element.position === updatedElement.position ? updatedElement : element
    );
    this.set({ periodicElementData: updatedData });
  }
}
