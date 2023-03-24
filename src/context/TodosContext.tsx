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
    
  let todoList = JSON.parse(localStorage.getItem('todo-list') ?? "{}") as TodoList;
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
      return {
        todos: [...todoList.todos, {
            id: action.id,
            title: action.title,
            description: action.description,
            completed: false, 
            createdAt: new Date()
          } as Todo
        ],
        paging: {
          ...todoList.paging, 
          totalCount: todoList.paging.totalCount + 1,
          activePage: calculateNewActivePageOnAdd(todoList.paging),
          startIndex: (calculateNewActivePageOnAdd(todoList.paging) - 1) * todoList.paging.itemsPerPage,
          endIndex: calculateNewActivePageOnAdd(todoList.paging) * todoList.paging.itemsPerPage,  

        } as Paging
      } as TodoList;
    }
    case 'changed': {
      return {
        todos: todoList.todos.map(t => {
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
        todos: todoList.todos.filter(t => t.id !== action.id),
        paging: {
          ...todoList.paging, 
          totalCount: todoList.paging.totalCount - 1,
          activePage: calculateNewActivePageOnDelete(todoList.paging),
          startIndex: (calculateNewActivePageOnDelete(todoList.paging) - 1) * todoList.paging.itemsPerPage,
          endIndex: calculateNewActivePageOnDelete(todoList.paging) * todoList.paging.itemsPerPage,  
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
      return {
        ...todoList,
        paging: {
          ...todoList.paging,
          activePage: action.activePage,
          totalCount: action.totalCount
        } as Paging
      }
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function calculateNewActivePageOnDelete(paging: Paging) {
  return Math.ceil((paging.totalCount - 1) / paging.itemsPerPage) < paging.activePage
    ? paging.activePage - 1 : paging.activePage;
}

function calculateNewActivePageOnAdd(paging: Paging) {
  return Math.ceil((paging.totalCount + 1) / paging.itemsPerPage) > paging.activePage
    ? paging.activePage + 1 : paging.activePage;
}