import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeApoioPage } from './home-apoio.page';

describe('HomeApoioPage', () => {
  let component: HomeApoioPage;
  let fixture: ComponentFixture<HomeApoioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeApoioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeApoioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
