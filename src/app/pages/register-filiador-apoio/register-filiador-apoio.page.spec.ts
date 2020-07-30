import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterFiliadorApoioPage } from './register-filiador-apoio.page';

describe('RegisterFiliadorApoioPage', () => {
  let component: RegisterFiliadorApoioPage;
  let fixture: ComponentFixture<RegisterFiliadorApoioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterFiliadorApoioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFiliadorApoioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
