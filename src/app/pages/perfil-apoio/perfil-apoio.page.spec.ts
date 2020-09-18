import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilApoioPage } from './perfil-apoio.page';

describe('PerfilApoioPage', () => {
  let component: PerfilApoioPage;
  let fixture: ComponentFixture<PerfilApoioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilApoioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilApoioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
