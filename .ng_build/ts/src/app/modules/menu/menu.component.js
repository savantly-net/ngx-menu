import { SecurityService } from '@savantly/ngx-security';
import { Component, Input, ViewChildren } from '@angular/core';
import { MenuService } from './menu.service';
import { MdMenuTrigger } from '@angular/material';
export class MenuComponent {
    /**
     * @param {?} securityService
     * @param {?} menuService
     */
    constructor(securityService, menuService) {
        this.menuService = menuService;
        this.security = securityService;
    }
    /**
     * @param {?} trigger
     * @param {?} level
     * @return {?}
     */
    openMenu(trigger, level) {
        this.triggers
            .filter((x) => x._element.nativeElement.dataset.level >= level && x !== trigger)
            .forEach(x => x.closeMenu());
        trigger.openMenu();
    }
    /**
     * @return {?}
     */
    closeMenu() {
        this.triggers.forEach(x => x.closeMenu());
    }
    /**
     * @param {?} subitem
     * @param {?} $event
     * @return {?}
     */
    doMenuItemCallback(subitem, $event) {
        if (subitem.callback) {
            subitem.callback($event);
        }
        else {
            console.warn('no callback defined');
        }
    }
    ;
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
MenuComponent.decorators = [
    { type: Component, args: [{
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
            },] },
];
/**
 * @nocollapse
 */
MenuComponent.ctorParameters = () => [
    { type: SecurityService, },
    { type: MenuService, },
];
MenuComponent.propDecorators = {
    'items': [{ type: Input },],
    'triggers': [{ type: ViewChildren, args: [MdMenuTrigger,] },],
};
function MenuComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuComponent.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MenuComponent.ctorParameters;
    /** @type {?} */
    MenuComponent.propDecorators;
    /** @type {?} */
    MenuComponent.prototype.items;
    /** @type {?} */
    MenuComponent.prototype.menuService;
    /** @type {?} */
    MenuComponent.prototype.security;
    /** @type {?} */
    MenuComponent.prototype.menus;
    /** @type {?} */
    MenuComponent.prototype.triggers;
}
//# sourceMappingURL=menu.component.js.map