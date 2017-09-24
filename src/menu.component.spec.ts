import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';
import { MenuService } from './menu.service';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const test = TestBed.configureTestingModule({
      imports: [MenuModule, SecurityModule, MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule],
      providers: [MenuService, SecurityService, {provide: APP_BASE_HREF, useValue: '/'}]
    })

    test.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
