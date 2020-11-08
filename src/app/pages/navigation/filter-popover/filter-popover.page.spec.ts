import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterPopoverPage } from './filter-popover.page';

describe('FilterPopoverPage', () => {
  let component: FilterPopoverPage;
  let fixture: ComponentFixture<FilterPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
