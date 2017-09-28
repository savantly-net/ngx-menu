import { SecurityService } from '@savantly/ngx-security';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { MenuService, Menu, IMenu } from './menu.service';
import { MdMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sv-menu',
  template: `
    <ng-container *ngFor="let item of menuService.getMenus() | async">
    	<ng-container *ngIf="menuService.shouldRender(item)">
    		<button md-button [mdMenuTriggerFor]="menu" #trigger="mdMenuTrigger" [attr.data-level]="1" (click)="openMenu(trigger, 1)" (mouseexit)="$event.stopPropagation()">
    			{{item.text}}
    		</button>
    		<md-menu class="custom-menu" #menu="mdMenu" [overlapTrigger]="false" (close)="closeMenu()" xPosition="after">
    			<ng-container *ngTemplateOutlet="subMenu; context: { $implicit: item.items, level: 2 }"></ng-container>
    		</md-menu>
    	</ng-container>
    </ng-container>

    <ng-template #subMenu let-items let-level="level">
      <ng-container *ngFor="let item of items">
        <ng-container *ngIf="item.items && item.items.length else simpleTmpl">
          <button *ngIf="!item.divider" md-menu-item [disabled]="item.disabled"
                  [mdMenuTriggerFor]="menu"
                  #trigger="mdMenuTrigger"
                  [attr.data-level]="level"
                  (mouseenter)="openMenu(trigger, level);" (click)="$event.stopPropagation()">
            <span>{{item.text}}</span>
            <span *ngIf="item.extraText">{{item.extraText}}</span>
            <md-icon *ngIf="item.icon">{{item.icon}}</md-icon>
          </button>
          <md-menu class="sub-menu" #menu="mdMenu" [overlapTrigger]="false" xPosition="before" >
            <ng-container *ngTemplateOutlet="subMenu; context: { $implicit: item.items || [], level: level + 1 }"></ng-container>
          </md-menu>
          <md-divider *ngIf="item.divider" class="mat-divider"></md-divider>
        </ng-container>
        <ng-template #simpleTmpl>
          <button *ngIf="!item.divider" md-menu-item [disabled]="item.disabled" (click)="doMenuItemCallback(item, $event)">
            <span>{{item.text}}</span>
            <span *ngIf="item.extraText">{{item.extraText}}</span>
          </button>
          <md-divider *ngIf="item.divider" class="mat-divider"></md-divider>
        </ng-template>
      </ng-container>
    </ng-template>
  `,
  styles: [`

  `]
})
export class MenuComponent implements OnInit {
  @Input() items: any[];
  menuService: MenuService;
  security: SecurityService;
  menus: Observable<Menu[]>;

  @ViewChildren(MdMenuTrigger) triggers: QueryList<MdMenuTrigger>;

  openMenu(trigger: MdMenuTrigger, level: number) {
    this.triggers
      .filter((x: any) => x._element.nativeElement.dataset.level >= level && x !== trigger)
      .forEach(x => x.closeMenu());
    trigger.openMenu();
  }

  closeMenu() {
    this.triggers.forEach(x => x.closeMenu());
  }

  doMenuItemCallback(subitem: IMenu, $event: any) {
    if (subitem.callback) {
      subitem.callback($event);
    } else {
      console.warn('no callback defined');
    }
  };

  constructor(
    securityService: SecurityService,
    menuService: MenuService) {
    this.menuService = menuService;
    this.security = securityService;
  }

  ngOnInit() {
  }

}
