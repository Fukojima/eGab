import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PerfilLiderancaFiliadorPage } from './perfil-lideranca-filiador.page';

describe('PerfilLiderancaFiliadorPage', () => {
  let component: PerfilLiderancaFiliadorPage;
  let fixture: ComponentFixture<PerfilLiderancaFiliadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilLiderancaFiliadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilLiderancaFiliadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
