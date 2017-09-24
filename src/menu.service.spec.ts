import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { MenuComponent } from './menu.component';
import { TestBed, inject } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SecurityModule, MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule],
      providers: [MenuService, SecurityService],
      declarations: [MenuComponent]
    });
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));

  it('should be have a default menu created', inject([MenuService], (service: MenuService) => {
    service.getMenus().subscribe(menus => {
      expect(menus.length).toBe(1);
    });
  }));

});
