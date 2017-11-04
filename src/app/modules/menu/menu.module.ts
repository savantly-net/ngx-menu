import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, FlexLayoutModule, SecurityModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: []
})
export class MenuModule {

  static menuServiceFactory(_securityService: SecurityService): MenuService {
    return new MenuService(_securityService);
  }

  static forRoot(): ModuleWithProviders {
     return {
        ngModule: MenuModule,
        providers: [{
            provide: MenuService,
            useFactory: MenuModule.menuServiceFactory,
            deps: [SecurityService]
          }]
      };
  }

  constructor (@Optional() @SkipSelf() parentModule: MenuModule, private securityService: SecurityService) {
    if (parentModule) {
      throw new Error(
        'MenuModule is already loaded. Import it in the AppModule only');
    }
  }
 }

