import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuModule } from './modules/menu';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';

import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SecurityModule.forRoot(),
    MenuModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(protected securityService: SecurityService) { }
}
