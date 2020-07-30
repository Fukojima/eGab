import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastroPendentePage } from './cadastro-pendente.page';

describe('CadastroPendentePage', () => {
  let component: CadastroPendentePage;
  let fixture: ComponentFixture<CadastroPendentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroPendentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroPendentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
