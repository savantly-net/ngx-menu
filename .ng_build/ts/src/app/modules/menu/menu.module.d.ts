import { ModuleWithProviders } from '@angular/core';
import { MenuService } from './menu.service';
import { SecurityService } from '@savantly/ngx-security';
export declare class MenuModule {
    static forRoot({securityService}?: {
        securityService?: SecurityService;
    }): ModuleWithProviders;
    constructor(parentModule: MenuModule);
}
export declare function menuServiceFactory(_securityService?: SecurityService): MenuService;
