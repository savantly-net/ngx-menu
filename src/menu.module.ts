import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityModule } from '@savantly/ngx-security';
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
  providers: []
})
export class MenuModule { }
