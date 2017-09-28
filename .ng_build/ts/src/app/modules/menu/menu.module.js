import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
export class MenuModule {
}
MenuModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule
                ],
                exports: [MenuComponent],
                declarations: [MenuComponent],
                providers: []
            },] },
];
/**
 * @nocollapse
 */
MenuModule.ctorParameters = () => [];
function MenuModule_tsickle_Closure_declarations() {
    /** @type {?} */
    MenuModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    MenuModule.ctorParameters;
}
//# sourceMappingURL=menu.module.js.map