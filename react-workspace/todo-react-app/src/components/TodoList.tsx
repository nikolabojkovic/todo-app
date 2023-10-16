
import { useEffect, useState } from 'react';
import { TodoItem } from './TodoItem';
import { Paging } from './Paging';
import { useTodoList, useTodoListDispatch } from '../context/TodoListContext';
import { ITodo } from '../models/Todo';
import { todoServiceInstance } from '../services/TodoService';
import { first } from 'rxjs';
import { IAction } from '../models/Action';
import { IRange } from '../models/IPaging';
import { IFilter } from '../models/IFilter';
import { ISort } from '../models/ISort';

export function TodoList() {
  const todoList = useTodoList();
  const dispatch = useTodoListDispatch();
  const [isLoading, setIsLoading] = useState(true); // TODO: implement loading indicator
  
  useEffect(() => {   
    //setTimeout(() => {
      todoServiceInstance.getList(
        {} as IRange, 
        {} as IFilter, 
        {
          column: 'createdAt',
          direction: 'asc'
        } as ISort)
        .pipe(first())
        .subscribe((list: ITodo[]) => {    
          dispatch({
            type: 'fetched',
            payload: {
              list: list
            }
          } as IAction);
          setIsLoading(false);
        });
      //}, 1000); 
      //console.log("effect");   
  }, [dispatch]);

  useEffect(() => {
    if (todoList.updateTriger != null) {
      todoServiceInstance.saveList(todoList.originalList);
    }
  }, [todoList.updateTriger, todoList.originalList]);

  

  return (
    <main className="App__todo-list">
      {todoList.displayList
        .slice(todoList.paging.startIndex, todoList.paging.endIndex)
        .map((todo: ITodo) => <TodoItem key={todo.id} todo={todo} />)}
      <Paging rotate={false} />
    </main>
  );
}