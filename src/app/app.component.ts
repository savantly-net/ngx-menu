import { Component } from '@angular/core';
import { MenuComponent, MenuService, Menu } from './modules/menu';

@Component({
  selector: 'sv-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private menuService: MenuService) {
    const menuItem = new Menu({
      id: 'example',
      text: 'test',
      isPublic: true,
      roles: ['*'],
      items: [],
      position: 0,
      disabled: false,
      icon: '',
      callback: () => {}
    });

    menuService.addMenu(menuItem);
  }

}
