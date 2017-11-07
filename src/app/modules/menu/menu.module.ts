import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ISecurityService } from '@savantly/ngx-security';

export const menuServiceFactory = function(securityService: ISecurityService){
  return new MenuService(securityService);
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, FlexLayoutModule
  ],
  exports: [MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, FlexLayoutModule, MenuComponent],
  declarations: [MenuComponent],
  providers: []
})
export class MenuModule {

  static forRoot(): ModuleWithProviders {
     return {
        ngModule: MenuModule,
        providers: [
          {
            provide: MenuService,
            useFactory: menuServiceFactory,
            deps: [ISecurityService]
          }
        ]
      };
  }

  constructor (@Optional() @SkipSelf() parentModule: MenuModule) {
    if (parentModule) {
      throw new Error(
        'MenuModule is already loaded. Import it in the AppModule only');
    }
  }
 }

