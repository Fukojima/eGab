import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MudarSenhaPage } from './mudar-senha.page';

describe('MudarSenhaPage', () => {
  let component: MudarSenhaPage;
  let fixture: ComponentFixture<MudarSenhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MudarSenhaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MudarSenhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
