import { MdMenuModule, MdToolbarModule, MdButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule} from '@savantly/ngx-security';
import { MenuModule } from './menu.module';
import { TestBed, inject } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule, MdToolbarModule, MdButtonModule, FlexLayoutModule,
        SecurityModule.forRoot(), MenuModule.forRoot()],
      providers: [],
      declarations: []
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
