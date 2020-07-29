import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalLiderancaPendentePage } from './modal-lideranca-pendente.page';

describe('ModalLiderancaPendentePage', () => {
  let component: ModalLiderancaPendentePage;
  let fixture: ComponentFixture<ModalLiderancaPendentePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLiderancaPendentePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLiderancaPendentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
