# PeriodicTableApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Deploy

[Periodic table APP](https://sunny-kleicha-315bce.netlify.app/)


## Task

Przygotuj widok wyświetlający tabelę pierwiastków (kolumny Number, Name, Weight, Symbol). Zasymuluj pobieranie danych do tabeli podczas startu aplikacji. Dodaj możliwość edycji dowolnej wartości rekordu wyświetlonego w tabeli (popup + input do zmiany wartości). Po zatwierdzeniu zmiany, wiersz tabeli powinien się zaktualizować. Edycja powinna odbywać się bez mutowania danych.

Dodaj filtr, który pozwoli na filtrowanie wyników (jeden input filtrujący po wszystkich polach). Filtrowanie powinno odbywać się po 2s bez zmiany wartości w inpucie.

Jako dane początkowe użyj
const ELEMENT_DATA: PeriodicElement[] = [
{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

