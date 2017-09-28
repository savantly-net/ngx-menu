import { SecurityService } from '@savantly/ngx-security';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
export const /** @type {?} */ defaultMenuId = 'mainMenu';
export class Menu {
    /**
     * @param {?} item
     * @return {?}
     */
    addMenuItem(item) {
        if (this.items.findIndex(x => x.id === item.id) > -1) {
            throw new Error('Item with this id: "' + item.id + '" already exists in menu: ' + this.id);
        }
        else {
            this.items.push(item);
        }
        const /** @type {?} */ index = this.items.findIndex(x => x.id === item.id);
        return this.items[index];
    }
    /**
     * @param {?} id
     * @return {?}
     */
    removeMenuItem(id) {
        const /** @type {?} */ index = this.items.findIndex(x => x.id === id);
        if (index === -1) {
            throw new Error('Item with this id doesn\'t exist' + id);
        }
        else {
            this.items.slice(index, 1);
        }
        return true;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getMenuItem(id) {
        const /** @type {?} */ index = this.items.findIndex(x => x.id === id);
        if (index === -1) {
            throw new Error('Menu item was not found: ' + id);
        }
        else {
            return this.items[index];
        }
    }
    /**
     * @param {?} options
     */
    constructor(options) {
        this.id = options.id || defaultMenuId;
        this.isPublic = options.isPublic || true;
        this.items = options.items || [];
        this.roles = options.roles || ['*'];
        this.text = options.text || 'unamed menu item';
        this.callback = options.callback;
    }
}
function Menu_tsickle_Closure_declarations() {
    /** @type {?} */
    Menu.prototype.id;
    /** @type {?} */
    Menu.prototype.text;
    /** @type {?} */
    Menu.prototype.isPublic;
    /** @type {?} */
    Menu.prototype.roles;
    /** @type {?} */
    Menu.prototype.items;
    /** @type {?} */
    Menu.prototype.position;
    /** @type {?} */
    Menu.prototype.callback;
    /** @type {?} */
    Menu.prototype.disabled;
    /** @type {?} */
    Menu.prototype.icon;
}
export class MenuService {
    /**
     * @param {?} security
     */
    constructor(security) {
        this.user = security.user;
        this.menus = [];
        const mainMenu = new Menu({
            id: 'mainMenu',
            text: 'Menu'
        });
        this.menus.push(mainMenu);
    }
    /**
     * @return {?}
     */
    getMenus() {
        return Observable.of(this.menus);
    }
    /**
     * @param {?} menuId
     * @return {?}
     */
    menuExists(menuId) {
        this.menus.map(menu => {
            if (menu.id === menuId) {
                return true;
            }
        });
        return false;
    }
    /**
     * @param {?} menuId
     * @return {?}
     */
    validateMenuExistence(menuId) {
        let /** @type {?} */ response = null;
        if (menuId && menuId.length) {
            this.menus.map(menu => {
                if (menu.id === menuId) {
                    response = menu;
                }
            });
        }
        if (response === null) {
            throw new Error('Menu does not exist: ' + menuId);
        }
        else {
            return response;
        }
    }
    /**
     * @param {?} menuId
     * @return {?}
     */
    getMenu(menuId) {
        // Validate that the menu exists and return it
        return this.validateMenuExistence(menuId);
    }
    ;
    /**
     * @param {?} menu
     * @return {?}
     */
    addMenu(menu) {
        if (this.menuExists(menu.id)) {
            throw new Error('Menu already exists with this id: ' + menu.id);
        }
        else {
            const /** @type {?} */ index = this.menus.push(menu);
            return this.menus[index - 1];
        }
    }
    ;
    /**
     * @param {?} menuId
     * @return {?}
     */
    removeMenu(menuId) {
        // Validate that the menu exists
        const /** @type {?} */ index = this.menus.findIndex(x => x.id === menuId);
        if (index > -1) {
            this.menus.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} menu
     * @return {?}
     */
    shouldRender(menu) {
        if (this.user !== null) {
            if (menu.roles.indexOf('*') > -1) {
                return true;
            }
            else {
                for (const /** @type {?} */ userRoleIndex of this.user.roles) {
                    for (const /** @type {?} */ roleIndex of menu.roles) {
                        if (menu.roles[(roleIndex)] === this.user.roles[(userRoleIndex)]) {
                            return true;
                        }
                    }
                }
            }
        }
        else {
            return menu.isPublic;
        }
        return false;
    }
}
MenuService.decorators = [
    { type: Injectable },
];
/**
 * @nocollapse
 */
MenuService.ctorParameters = () => [
    { type: SecurityService, },
];
function MenuService_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuService.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MenuService.ctorParameters;
    /** @type {?} */
    MenuService.prototype.menus;
    /** @type {?} */
    MenuService.prototype.user;
}
//# sourceMappingURL=menu.service.js.map