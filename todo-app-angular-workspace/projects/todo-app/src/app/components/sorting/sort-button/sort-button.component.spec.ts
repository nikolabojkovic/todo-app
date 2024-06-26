import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { of } from 'rxjs';

import { IState, todosReducer, TodoEffects } from '../../../shared/state';
import { SortButtonComponent, SortIconComponent } from '../';
import { StorageProviderKey, SettingsProviderKey } from '../../../shared/services';
import { ISort, SortDirection, SortType } from '../../../shared/models';
import { todos } from '../../../tests/test-data';

describe('SortButtonComponent', () => {
  let component: SortButtonComponent;
  let fixture: ComponentFixture<SortButtonComponent>;
  let store: Store<IState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SortButtonComponent, SortIconComponent],
      imports: [
        FontAwesomeModule,
        StoreModule.forRoot({ todos: todosReducer }),
        EffectsModule.forRoot([TodoEffects])
      ],
      providers: [
        {
          provide: StorageProviderKey,
          useValue: {
            getItem: () => of(JSON.stringify(todos)),
            setItem: () => of({})
          }
        },
        {
          provide: SettingsProviderKey,
          useValue: {
            loadSettings: () => of({}),
            saveSettings: () => of({})
          }
        }
      ]
    });
    fixture = TestBed.createComponent(SortButtonComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callThrough();
    spyOn(component.onSort, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSort', () => {
    it('should sort Desc', () => {
      const sort = { column: 'title', direction: SortDirection.Asc } as ISort;
      component.sortDirection = sort.direction;
      component.column = sort.column;
      component.sortType = SortType.direction;
      component.handleClick();

      expect(component.onSort.emit).toHaveBeenCalledWith({ column: 'title', direction: SortDirection.Desc } as ISort);
    });

    it('should sort Asc', () => {
      const sort = { column: 'title', direction: SortDirection.Desc } as ISort;
      component.sortDirection = sort.direction;
      component.column = sort.column;
      component.sortType = SortType.direction;
      component.handleClick();

      expect(component.onSort.emit).toHaveBeenCalledWith({ column: 'title', direction: SortDirection.Asc } as ISort);
    });

    it('should manuall sort', () => {
      const sort = { column: 'sortId', direction: SortDirection.None } as ISort;
      component.sortDirection = sort.direction;
      component.column = sort.column;
      component.sortType = SortType.noDirection;
      component.handleClick();

      expect(component.isActive).toBeTrue();
      expect(component.onSort.emit).toHaveBeenCalledWith({ column: 'sortId', direction: SortDirection.None } as ISort);
    });
  });
});
