import { TestBed, async } from '@angular/core/testing';
import { SecurityModule, SecurityMockService, ISecurityService } from '@savantly/ngx-security';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideRoutes } from '@angular/router';
import { MenuModule, MenuService, menuServiceFactory } from '@savantly/ngx-menu';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MenuModule],
      declarations: [
        AppComponent
      ],
      providers: [
        provideRoutes([]),
        {provide: ISecurityService, useClass: SecurityMockService},
        {provide: MenuService, useFactory: menuServiceFactory, deps: [ISecurityService]}]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
