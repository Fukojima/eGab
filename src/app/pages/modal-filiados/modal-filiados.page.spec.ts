import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFiliadosPage } from './modal-filiados.page';

describe('ModalFiliadosPage', () => {
  let component: ModalFiliadosPage;
  let fixture: ComponentFixture<ModalFiliadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFiliadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFiliadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
