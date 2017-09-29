import { OnInit, QueryList } from '@angular/core';
import { MenuService, Menu, IMenu } from './menu.service';
import { MdMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';
export declare class MenuComponent implements OnInit {
    items: any[];
    menuService: MenuService;
    menus: Observable<Menu[]>;
    triggers: QueryList<MdMenuTrigger>;
    openMenu(trigger: MdMenuTrigger, level: number): void;
    closeMenu(): void;
    doMenuItemCallback(subitem: IMenu, $event: any): void;
    constructor(menuService: MenuService);
    ngOnInit(): void;
}
