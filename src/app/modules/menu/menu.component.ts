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
        promise.then(function(value){
          console.log('the promise returned from the callback was resolved with the value:', value);
          $event.stopPropagation();
        }).catch(function(err){
          console.error('the promise returned from the callback was rejected', err);
        });
      } else {
        console.log('no promise return from the callback');
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
