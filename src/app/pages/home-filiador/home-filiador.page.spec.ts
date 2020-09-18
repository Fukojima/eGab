import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeFiliadorPage } from './home-filiador.page';

describe('HomeFiliadorPage', () => {
  let component: HomeFiliadorPage;
  let fixture: ComponentFixture<HomeFiliadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFiliadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFiliadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
