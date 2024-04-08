import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { ITodo } from '../../shared/models';
import { TodoService, SettingsProviderKey, StorageProviderKey } from '../../shared/services';
import { IState, TodoEffects, todosReducer, TodoListActions } from '../../shared/state';
import { TodoListComponent } from './todo-list.component';
import { todos } from '../../tests/test-data';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<IState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: TodoService,
          useValue: {
            getList: () => of(todos),
            saveList: () => of({})
          }
        },
        {
          provide: StorageProviderKey,
          useValue: {
            getItem: () => of(JSON.stringify(todos))
          }
        },
        {
          provide: SettingsProviderKey,
          useValue: {
            loadSettings: () => of({}),
            saveSettings: () => of({})
          }
        }
      ],
      imports: [
        StoreModule.forRoot({ todos: todosReducer }),
        EffectsModule.forRoot([TodoEffects])
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should select dipslay list', (done: DoneFn) => {
      component.ngOnInit();
      store.dispatch(TodoListActions.fetched({ list: todos }));

      component.items$.subscribe((value: ITodo[]) => {
        expect(value.length).toBe(5);
        done();
      });
    }, 100);
  });
});
