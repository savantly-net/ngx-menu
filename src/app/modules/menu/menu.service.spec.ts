import { SecurityMockService, ISecurityService } from '@savantly/ngx-security';
import { MenuService, Menu } from '@savantly/ngx-menu';
import { TestBed, inject } from '@angular/core/testing';

const menuServiceFactory = function(securityService: ISecurityService){
  return new MenuService(securityService);
};

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: ISecurityService, useClass: SecurityMockService},
        {provide: MenuService, useFactory: menuServiceFactory, deps: [ISecurityService]}],
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
