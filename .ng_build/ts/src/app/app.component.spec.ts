import { TestBed, async } from '@angular/core/testing';
import { SecurityModule, SecurityService } from '@savantly/ngx-security';
import { AppComponent } from './app.component';
import { MenuModule, MenuService } from '@savantly/ngx-menu';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SecurityModule,
        MenuModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [SecurityService, MenuService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
