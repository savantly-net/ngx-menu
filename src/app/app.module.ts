import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenuModule, MenuService } from '@savantly/ngx-menu';
import { SecurityService } from '@savantly/ngx-security';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MenuModule
  ],
  providers: [MenuService, SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
