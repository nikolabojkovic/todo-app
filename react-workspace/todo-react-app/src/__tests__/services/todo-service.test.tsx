import { IFilter } from '../../models/IFilter';
import { IRange } from '../../models/IPaging';
import { ISort, SortDirection } from '../../models/ISort';
import { ITodo } from '../../models/Todo';
import { TodoService } from '../../services/TodoService';
import { LocalStorageMockService } from '../../Mocks/LocalStorageMockService';

const todoService = new TodoService(new LocalStorageMockService());

describe('todo service', () => {
  it('get todo list', (done) => {
    todoService.getList({} as IRange, {} as IFilter, {} as ISort)
      .subscribe((todoList: ITodo[]) => {
        expect(todoList !== null).toBeTruthy();
        expect(todoList.length > 0).toBeTruthy();
        expect(todoList.length).toBe(3);
        done();
      });  
  }, 200);

  // it('filter completed todo list', () => {
  //   let todoList = todoService.getTodoList();
  //   let filteredList = todoService.filter(todoList.originalList, {completed: true, uncompleted: false} as IFilter);
  //   expect(filteredList !== null).toBeTruthy();
  //   expect(filteredList.length).toBe(1);
  //   expect(filteredList[0].completed).toBeTruthy();
  // });

  // it('filter uncopmleted todo list', () => {
  //   let todoList = todoService.getTodoList();
  //   let filteredList = todoService.filter(todoList.originalList, {completed: false, uncompleted: true} as IFilter);
  //   expect(filteredList !== null).toBeTruthy();
  //   expect(filteredList.length).toBe(5);
  //   expect(filteredList[0].completed).toBeFalsy();
  // });

  // it('search todo list', () => {
  //   var title = 'Task 1';
  //   let todoList = todoService.getTodoList();
  //   let searchedList = todoService.search(todoList.originalList, title);
  //   expect(searchedList !== null).toBeTruthy();
  //   expect(searchedList.length).toBe(1);
  //   expect(searchedList[0].title).toBe(title);
  // });

  // it('sort todo list by title asc', () => {
  //   let todoList = todoService.getTodoList();
  //   let sortedList = todoService.sort(todoList.originalList, { column: 'title', direction: SortDirection.Asc} as ISort);
  //   expect(sortedList !== null).toBeTruthy();
  //   expect(sortedList.length).toBe(6);
  //   expect(sortedList[0].title).toBe('Task 1');
  // });

  // it('sort todo list by title desc', () => {
  //   let todoList = todoService.getTodoList();
  //   let sortedList = todoService.sort(todoList.originalList, { column: 'title', direction: SortDirection.Desc} as ISort);
  //   expect(sortedList !== null).toBeTruthy();
  //   expect(sortedList.length).toBe(6);
  //   expect(sortedList[5].title).toBe('Task 1');
  // });
});