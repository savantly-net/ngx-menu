import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SecurityService } from '@savantly/ngx-security';

export function menuServiceFactory (_securityService: SecurityService): MenuService {
  return new MenuService(_securityService);
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, FlexLayoutModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: [
    {
      provide: MenuService,
      useFactory: menuServiceFactory,
      deps: [SecurityService]
    }
  ]
})
export class MenuModule {

  constructor (@Optional() @SkipSelf() parentModule: MenuModule) {
    if (parentModule) {
      throw new Error(
        'MenuModule is already loaded. Import it in the AppModule only');
    } else {
      console.log('Constructed MenuModule for child module')
    }
  }
 }

