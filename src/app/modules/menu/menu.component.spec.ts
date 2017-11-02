import { MatMenuModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SecurityModule } from '@savantly/ngx-security';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { MenuModule } from './menu.module';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    const test = TestBed.configureTestingModule({
      imports: [SecurityModule.forRoot(), MenuModule.forRoot(), MatMenuModule, MatToolbarModule, MatButtonModule, FlexLayoutModule],
      providers: []
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
