import { createContext, useContext, useReducer } from "react";
import { Paging, Todo, TodoList } from "../models/todo";
import { initTodoList } from "./initialData";
 
export const TodosContext = createContext({} as TodoList);
export const TodosDispatchContext = createContext(null as any);

function getTodos() {
  if (localStorage.getItem('todo-list') === undefined 
   || localStorage.getItem('todo-list') === null) {
    return initTodoList;
  }
    
  const sortBy = {
    column: 'createdAt',
    direction: 'asc'
  };
  const todos = sort(JSON.parse(localStorage.getItem('todo-list') ?? "[]") as Todo[], sortBy);

  let todoList = {
    originalList: todos, 
    displayList: todos,
    search: {
      searchTerm: '',
    },
    filter: {
      completed: false,
      uncompleted: false,
    },
    sort: sortBy,
    paging: {
      totalCount: todos.length,
      activePage: todos.length > 0 ? 1 : 0,
      startIndex: 0,
      endIndex: 5,
      itemsPerPage: 5
    } as Paging
  };
  return todoList;
}

export function TodoListProvider({ children }: any) {
  const [todoList, dispatch] = useReducer(
    todoListReducer,
    getTodos()
  );

  return (
    <TodosContext.Provider value={todoList}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

export function useTodoList() {
  return useContext(TodosContext);
}

export function useTodoListDispatch() {
  return useContext(TodosDispatchContext);
}

function todoListReducer(todoList: TodoList, action: any) {
  switch (action.type) {
    case 'added': {
      const newTodo = {
        id: action.id,
        title: action.title,
        description: action.description,
        completed: false, 
        createdAt: new Date()
      } as Todo;

      return {
        ...todoList,
        originalList: [...todoList.originalList, newTodo],
        displayList: [...todoList.displayList, newTodo],
        paging: {
          ...todoList.paging, 
          totalCount: todoList.paging.totalCount + 1,
          activePage: calculateActivePageOnAdd(todoList.paging),
          startIndex: (calculateActivePageOnAdd(todoList.paging) - 1) * todoList.paging.itemsPerPage,
          endIndex: calculateActivePageOnAdd(todoList.paging) * todoList.paging.itemsPerPage
        } as Paging
      } as TodoList;
    }
    case 'changed': {
      return {
        ...todoList,
        originalList: todoList.originalList.map(t => {
          if (t.id === action.todo.id) {
            return action.todo;
          } else {
            return t;
          }
        }),
        displayList: todoList.displayList.map(t => {
          if (t.id === action.todo.id) {
            return action.todo;
          } else {
            return t;
          }
        }),
        paging: {...todoList.paging}
      } as TodoList;
    }
    case 'deleted': {
      return {
        ...todoList,
        originalList: todoList.originalList.filter(t => t.id !== action.id),
        displayList: todoList.displayList.filter(t => t.id !== action.id),
        paging: {
          ...todoList.paging, 
          totalCount: todoList.paging.totalCount - 1,
          activePage: calculateActivePageOnDelete(todoList.paging),
          startIndex: (calculateActivePageOnDelete(todoList.paging) - 1) * todoList.paging.itemsPerPage,
          endIndex: calculateActivePageOnDelete(todoList.paging) * todoList.paging.itemsPerPage,  
        } as Paging
      } as TodoList;
    }
    case 'paging-updated': {
      return {
        ...todoList,
        paging: {
          ...todoList.paging,
          activePage: action.activePage,
          itemPerPage: action.itemsPerPage,
          startIndex: (action.activePage - 1) * action.itemsPerPage,
          endIndex: action.activePage * action.itemsPerPage
        } as Paging
      }
    }
    case 'searched': {
      const filteredList = filter(todoList.originalList, todoList.filter);
      const searchedList = search(filteredList, action.searchTerm);
      return {
        ...todoList,
        displayList: [...searchedList],
        search: { searchTerm: action.searchTerm },
        paging: {
          ...todoList.paging,
          activePage: action.activePage,
          totalCount: searchedList.length,
          startIndex: (action.activePage - 1) * todoList.paging.itemsPerPage,
          endIndex: action.activePage * todoList.paging.itemsPerPage
        } as Paging
      }
    }
    case 'searchTerm-updated': {
      return {
        ...todoList,
        search: { searchTerm: action.searchTerm },
      }
    }
    case 'filtered': {
      const filteredList = filter(todoList.originalList, action.filter);
      const searchedList = search(filteredList, todoList.search.searchTerm);
      return {
        ...todoList,
        displayList: [...searchedList],
        filter: {...action.filter},
        paging: {
          ...todoList.paging,
          activePage: action.activePage,
          totalCount: searchedList.length,
          startIndex: (action.activePage - 1) * todoList.paging.itemsPerPage,
          endIndex: action.activePage * todoList.paging.itemsPerPage
        } as Paging
      }
    }
    case 'sorted': {
      const filteredList = filter(todoList.originalList, todoList.filter);
      const searchedList = search(filteredList, todoList.search.searchTerm);
      const sortedList = sort(searchedList, action.sort);

      return {
        ...todoList,
        displayList: [...sortedList],
        sort: {...action.sort},
        paging: {...todoList.paging} as Paging
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function search(list: Todo[], searchTerm: string,) {
  let filteredList = list;

  if (searchTerm !== '') {
    filteredList = list.filter((todo: Todo) => 
      todo.title.trim()
                .toLocaleLowerCase()
                .includes(searchTerm.trim()
                .toLocaleLowerCase()) 
   || todo.description.trim()
                      .toLocaleLowerCase()
                      .includes(searchTerm.trim()
                      .toLocaleLowerCase()));
  }

  return filteredList;
}

function filter(list: Todo[], filter: any = null) {
  let filteredList = list;

  if (filter && filter.completed && filter.uncompleted) {
    return filteredList;
  }

  if (filter?.completed) {
    filteredList = filteredList.filter((todo: Todo) => todo.completed === true);
  }

  if (filter?.uncompleted) {
    filteredList = filteredList.filter((todo: Todo) => todo.completed === false);
  }

  return filteredList;
}

function sort(list: Todo[], sort: any) {
  let sortResult = [];
 console.log(sort);
  if (sort.column === 'createdAt') {
    if (sort.direction === 'asc') {
      sortResult = [...list.sort((a: any, b: any) => Date.parse(a[sort.column]) > Date.parse(b[sort.column]) ? 1 : -1)]
    } else {
      sortResult = [...list.sort((a: any, b: any) => Date.parse(a[sort.column]) < Date.parse(b[sort.column]) ? 1 : -1)]
    }

    return sortResult;
  }

  if (sort.direction === 'asc') {
    sortResult = [...list.sort((a: any, b: any) => a[sort.column] > b[sort.column] ? 1 : -1)]
  } else {
    sortResult = [...list.sort((a: any, b: any) => a[sort.column] < b[sort.column] ? 1 : -1)]
  }

  return sortResult;
}

function calculateActivePageOnDelete(paging: Paging) {
  return Math.ceil((paging.totalCount - 1) / paging.itemsPerPage) < paging.activePage
    ? paging.activePage - 1 : paging.activePage;
}

function calculateActivePageOnAdd(paging: Paging) {
  return Math.ceil((paging.totalCount + 1) / paging.itemsPerPage) > paging.activePage
    ? Math.ceil((paging.totalCount + 1) / paging.itemsPerPage) : paging.activePage;
}