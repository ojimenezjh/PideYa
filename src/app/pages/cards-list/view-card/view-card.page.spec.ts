import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewCardPage } from './view-card.page';

describe('ViewCardPage', () => {
  let component: ViewCardPage;
  let fixture: ComponentFixture<ViewCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
