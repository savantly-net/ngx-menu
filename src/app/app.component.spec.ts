import { TestBed, async } from '@angular/core/testing';
import { SecurityModule } from '@savantly/ngx-security';
import { AppComponent } from './app.component';
import { MenuModule } from '@savantly/ngx-menu';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SecurityModule.forRoot(),
        MenuModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: []
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
