import { MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule, SecurityMockService } from '@savantly/ngx-security';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuService, MenuComponent } from '@savantly/ngx-menu';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const test = TestBed.configureTestingModule({
      imports: [SecurityModule.forRoot(new SecurityMockService()), MatMenuModule, MatToolbarModule, MatButtonModule, FlexLayoutModule],
      providers: [MenuService]
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
