import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from '@savantly/ngx-security';
import { MenuService } from './menu.service';
import { MenuComponent } from './menu.component';
import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    SecurityModule,
    MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule
  ],
  exports: [MenuComponent],
  declarations: [MenuComponent],
  providers: [MenuService]
})
export class MenuModule { }
