import { IUser, SecurityService } from '@savantly/ngx-security';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
export declare const defaultMenuId = "mainMenu";
export interface IMenu {
    id: string;
    text: string;
    isPublic: boolean;
    roles: string[];
    items: IMenu[];
    position: number;
    disabled: boolean;
    icon: string;
    callback: (event: any) => void;
    addMenuItem: (item: any) => IMenu;
    removeMenuItem: (id: string) => boolean;
    getMenuItem: (id: string) => IMenu;
}
export declare class Menu implements IMenu {
    id: string;
    text: string;
    isPublic: boolean;
    roles: string[];
    items: IMenu[];
    position: number;
    callback: (event: any) => void;
    disabled: boolean;
    icon: string;
    addMenuItem(item: IMenu): IMenu;
    removeMenuItem(id: string): boolean;
    getMenuItem(id: string): IMenu;
    constructor(options: any);
}
export declare class MenuService {
    private menus;
    user: IUser;
    getMenus(): Observable<Menu[]>;
    menuExists(menuId: string): boolean;
    validateMenuExistence(menuId: string): Menu;
    getMenu(menuId: string): Menu;
    addMenu(menu: IMenu): Menu;
    removeMenu(menuId: string): boolean;
    shouldRender(menu: IMenu): boolean;
    constructor(security: SecurityService);
}
