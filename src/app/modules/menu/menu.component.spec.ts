import { MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityMockService, ISecurityService } from '@savantly/ngx-security';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { provideRoutes } from '@angular/router';
import { MenuService, MenuComponent } from '@savantly/ngx-menu';

const menuServiceFactory = function(securityService: ISecurityService){
  return new MenuService(securityService);
};

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const test = TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatMenuModule, MatToolbarModule, MatButtonModule, FlexLayoutModule],
      declarations: [MenuComponent],
      providers: [
        provideRoutes([]),
        {provide: ISecurityService, useClass: SecurityMockService},
        {provide: MenuService, useFactory: menuServiceFactory, deps: [ISecurityService]}],
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
