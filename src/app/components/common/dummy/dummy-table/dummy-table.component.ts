import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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

@Component({
  selector: 'app-dummy-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ],
  templateUrl: './dummy-table.component.html',
  styleUrls: ['./dummy-table.component.css'],
})
export class DummyTableComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  data = [
    { id: 1, name: 'Rajesh', email: 'rajesh@gmail.com', isSelected: false },
    { id: 2, name: 'Paresh', email: 'paresh@gmail.com', isSelected: false },
    { id: 3, name: 'Naresh', email: 'naresh@gmail.com', isSelected: false },
    { id: 4, name: 'Suresh', email: 'suresh@gmail.com', isSelected: false },
    { id: 5, name: 'Karan', email: 'karan@gmail.com', isSelected: false },
    { id: 6, name: 'dummy', email: 'dummy@gmail.com', isSelected: false },
    { id: 7, name: 'dummy1', email: 'dummy@gmail.com', isSelected: false },
    { id: 8, name: 'dummy2', email: 'dummy@gmail.com', isSelected: false },
    { id: 9, name: 'dummy3', email: 'dummy@gmail.com', isSelected: false },
    { id: 10, name: 'dummy4', email: 'dummy@gmail.com', isSelected: false },
    { id: 11, name: 'dummy5', email: 'dummy@gmail.com', isSelected: false },
    { id: 12, name: 'dummy6', email: 'dummy@gmail.com', isSelected: false },
    { id: 13, name: 'dummy7', email: 'dummy@gmail.com', isSelected: false },
    { id: 14, name: 'dummy8', email: 'dummy@gmail.com', isSelected: false },
    { id: 1, name: 'Rajesh', email: 'rajesh@gmail.com', isSelected: false },
    { id: 2, name: 'Paresh', email: 'paresh@gmail.com', isSelected: false },
    { id: 3, name: 'Naresh', email: 'naresh@gmail.com', isSelected: false },
    { id: 4, name: 'Suresh', email: 'suresh@gmail.com', isSelected: false },
    { id: 5, name: 'Karan', email: 'karan@gmail.com', isSelected: false },
    { id: 6, name: 'dummy', email: 'dummy@gmail.com', isSelected: false },
    { id: 7, name: 'dummy1', email: 'dummy@gmail.com', isSelected: false },
    { id: 8, name: 'dummy2', email: 'dummy@gmail.com', isSelected: false },
    { id: 9, name: 'dummy3', email: 'dummy@gmail.com', isSelected: false },
    { id: 10, name: 'dummy4', email: 'dummy@gmail.com', isSelected: false },
    { id: 11, name: 'dummy5', email: 'dummy@gmail.com', isSelected: false },
    { id: 12, name: 'dummy6', email: 'dummy@gmail.com', isSelected: false },
    { id: 13, name: 'dummy7', email: 'dummy@gmail.com', isSelected: false },
    { id: 14, name: 'dummy8', email: 'dummy@gmail.com', isSelected: false },
  ];

  displayedColumns = ['id', 'name', 'email'];

  edit(element: any) {
    // Abre un modal de edición para el elemento
  }

  delete(element: any) {
    // Elimina el elemento del dataSource y de la fuente de datos
  }
  add(element: any) {
    // Elimina el elemento del dataSource y de la fuente de datos
  }
  onInit() {}
}
