import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultaCadastroLiderancaPage } from './consulta-cadastro-lideranca.page';

describe('ConsultaCadastroLiderancaPage', () => {
  let component: ConsultaCadastroLiderancaPage;
  let fixture: ComponentFixture<ConsultaCadastroLiderancaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultaCadastroLiderancaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaCadastroLiderancaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
