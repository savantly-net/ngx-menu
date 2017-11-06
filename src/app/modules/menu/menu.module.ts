import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';
import { MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SecurityService } from '@savantly/ngx-security';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule, MatToolbarModule, MatButtonModule, MatIconModule, FlexLayoutModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: []
})
export class MenuModule {

  static forRoot(): ModuleWithProviders {
    console.log('Creating MenuModule for Root');
     return {
        ngModule: MenuModule,
        providers: [
          {
            provide: MenuService,
            useClass: MenuService
          }
        ]
      };
  }

  constructor (@Optional() @SkipSelf() parentModule: MenuModule) {
    if (parentModule) {
      throw new Error(
        'MenuModule is already loaded. Import it in the AppModule only');
    } else {
      console.log('Constructed MenuModule for child module')
    }
  }
 }

