import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MenuService, Menu, IMenu, defaultMenuId } from './menu.service';
import { MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sv-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() menuId: string;
  appMenu: IMenu;

  doMenuItemCallback(subitem: IMenu, $event: any) {
    if (subitem.callback) {
      const promise = subitem.callback();
      if (promise) {
        promise.then(function(){
        console.log('completed callback');
        $event.stopPropagation();
        });
      } else {
        console.log('no callback');
        $event.stopPropagation();
      }
    } else {
      console.warn('no callback defined');
    }
  };

  constructor( protected menuService: MenuService) {
  }

  ngOnInit() {
    const menuId = this.menuId || defaultMenuId;
    this.appMenu = this.menuService.getMenu(menuId);
  }

}
