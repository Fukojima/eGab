import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalApoioPage } from './modal-apoio.page';

describe('ModalApoioPage', () => {
  let component: ModalApoioPage;
  let fixture: ComponentFixture<ModalApoioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalApoioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalApoioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
