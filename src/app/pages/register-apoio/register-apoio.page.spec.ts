import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterApoioPage } from './register-apoio.page';

describe('RegisterApoioPage', () => {
  let component: RegisterApoioPage;
  let fixture: ComponentFixture<RegisterApoioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterApoioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterApoioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
