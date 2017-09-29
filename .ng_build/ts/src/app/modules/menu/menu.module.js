import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
export class MenuModule {
    /**
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('MenuModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?=} __0
     * @return {?}
     */
    static forRoot({ securityService = SecurityService } = { securityService: new SecurityService() }) {
        return {
            ngModule: MenuModule,
            providers: [{
                    provide: MenuService,
                    useFactory: menuServiceFactory,
                    deps: [SecurityService]
                }]
        };
    }
}
MenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule, SecurityModule
                ],
                exports: [MenuComponent],
                declarations: [MenuComponent],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
MenuModule.ctorParameters = () => [
    { type: MenuModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
];
function MenuModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MenuModule.ctorParameters;
}
/**
 * @param {?=} _securityService
 * @return {?}
 */
export function menuServiceFactory(_securityService) {
    return new MenuService(_securityService);
}
//# sourceMappingURL=menu.module.js.map