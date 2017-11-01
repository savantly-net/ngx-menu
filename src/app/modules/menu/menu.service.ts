import { IUser, SecurityService } from '@savantly/ngx-security';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export const defaultMenuId = 'mainMenu';

export interface IMenu {
  id: string;
  text: string;
  isPublic: boolean;
  roles: string[];
  items: IMenu[];
  position: number;
  disabled: boolean;
  icon: string;
  callback: () => Promise<any>;
  addMenuItem: (item: any) => IMenu;
  removeMenuItem: (id: string) => boolean;
  getMenuItem: (id: string) => IMenu;
}

export class Menu implements IMenu {
  id: string;
  text: string;
  isPublic: boolean;
  roles: string[];
  items: IMenu[];
  position: number;
  callback: () => Promise<any>;
  disabled: boolean;
  icon: string;

  // Add menu item object
  addMenuItem(item: IMenu) {
    if (this.items.findIndex(x => x.id === item.id) > -1) {
      throw new Error('Item with this id: "' + item.id + '" already exists in menu: ' + this.id);
    } else {
      this.items.push(item);
    }
    const index = this.items.findIndex(x => x.id === item.id);
    return this.items[index];
  }

  // Remove menu item object
  removeMenuItem(id: string): boolean {
    const index = this.items.findIndex(x => x.id === id);
    if (index === -1) {
      throw new Error('Item with this id doesn\'t exist' + id);
    } else {
      this.items.slice(index, 1);
    }
    return true;
  }

  getMenuItem(id: string): IMenu {
    const index = this.items.findIndex(x => x.id === id);
    if (index === -1) {
      throw new Error('Menu item was not found: ' + id);
    } else {
      return this.items[index];
    }
  }

  constructor (options: any) {
    this.id = options.id || defaultMenuId;
    this.isPublic = options.isPublic || true;
    this.items = options.items || [];
    this.roles = options.roles || ['*'];
    this.text = options.text || 'unamed menu item';
    this.callback = options.callback;
  }
}

@Injectable()
export class MenuService {
  private menus: Menu[];
  user: IUser;

  getMenus(): Observable<Menu[]> {
    return Observable.of(this.menus);
  }

  menuExists(menuId: string): boolean {
    this.menus.map(menu => {
      if (menu.id === menuId) {
        return true;
      }
    });
    return false;
  }

  // Validate menu existence
  validateMenuExistence(menuId: string): Menu {
    let response = null;
    if (menuId && menuId.length) {
      this.menus.map(menu => {
        if (menu.id === menuId) {
          response = menu;
        }
      });
    }
    if (response === null) {
      throw new Error('Menu does not exist: ' + menuId);
    } else {
      return response;
    }
  }

  // Get the menu object by menu id
  getMenu(menuId: string): Menu {
    // Validate that the menu exists and return it
    return this.validateMenuExistence(menuId);
  };

  // Add new menu object by menu id
  addMenu(menu: IMenu) {
    if (this.menuExists(menu.id)) {
      throw new Error ('Menu already exists with this id: ' + menu.id);
    } else {
      const index = this.menus.push(menu);
      return this.menus[index - 1];
    }
  };

  // Remove existing menu object by menu id
  removeMenu(menuId: string): boolean {
    // Validate that the menu exists
    const index = this.menus.findIndex(x => x.id === menuId);
    if (index > -1) {
      this.menus.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  shouldRender(menu: IMenu): boolean {
    if (this.user !== null) {
      if (menu.roles.indexOf('*') > -1) {
        return true;
      } else {
        for (const userRoleIndex of this.user.roles) {
          for (const roleIndex of menu.roles) {
            if (menu.roles[<any>roleIndex] === this.user.roles[<any>userRoleIndex]) {
              return true;
            }
          }
        }
      }
    } else {
      return menu.isPublic;
    }
    return false;
  }

  constructor(security: SecurityService) {
    this.user = security.user;
    this.menus = [];
    const mainMenu = new Menu({
      id: 'mainMenu',
      text: 'Menu'});
    this.menus.push(mainMenu);
  }

}
