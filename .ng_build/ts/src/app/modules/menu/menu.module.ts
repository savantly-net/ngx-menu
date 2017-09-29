import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';

@NgModule({
  imports: [
    CommonModule,
    MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule, SecurityModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: []
})
export class MenuModule {

  static forRoot({securityService = SecurityService}: {securityService?: SecurityService}
       = {securityService: new SecurityService()}): ModuleWithProviders {
     return {
        ngModule: MenuModule,
        providers: [{
            provide: MenuService,
            useFactory: menuServiceFactory,
            deps: [SecurityService]
          }]
      };
  }

  constructor (@Optional() @SkipSelf() parentModule: MenuModule) {
    if (parentModule) {
      throw new Error(
        'MenuModule is already loaded. Import it in the AppModule only');
    }
  }
 }

export function menuServiceFactory(_securityService?: SecurityService): MenuService {
  return new MenuService(_securityService);
}
