import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuModule } from '@savantly/ngx-menu';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SecurityModule.forRoot(),
    MenuModule.forRoot({securityService: SecurityService})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
