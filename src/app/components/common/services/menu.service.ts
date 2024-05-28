import { Injectable } from '@angular/core';
import { MenuItems } from 'src/app/_helpers/data/menuItems';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  menu = MenuItems;

  getMenu() {
    return this.menu;
  }
}
