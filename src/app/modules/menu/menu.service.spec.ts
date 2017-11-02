import { MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule} from '@savantly/ngx-security';
import { MenuModule } from './menu.module';
import { TestBed, inject } from '@angular/core/testing';

import { MenuService, Menu } from './index';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatMenuModule, MatToolbarModule, MatButtonModule, FlexLayoutModule,
        SecurityModule.forRoot(), MenuModule.forRoot()],
      providers: [],
      declarations: []
    });
  });

  it('should be created', inject([MenuService], (service: MenuService) => {
    expect(service).toBeTruthy();
  }));

  it('should be have a default menu created', inject([MenuService], (service: MenuService) => {
    
    const mainMenu = new Menu({
      id: 'mainMenu',
      text: 'Menu'});
    service.addMenu(mainMenu);
    
    service.getMenus().subscribe(menus => {
      expect(menus.length).toBe(1);
      expect(menus[0].id).toBe('mainMenu')
    });
  }));

});
