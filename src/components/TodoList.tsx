import { useEffect, useRef, useState, useCallback } from 'react'
import { Todo } from "../models/todo";
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { Paging } from './Paging';
import { Search } from './Search';
import { useTodoList, useTodoListDispatch } from '../context/TodosContext';

export function TodoList() {
  const todoList = useTodoList();
  const dispatch = useTodoListDispatch();
  
  const [displayList, setDisplayList] = useState(todoList.todos);
  const id = useRef(JSON.parse(localStorage.getItem('id') ?? "6"));

  function searchTodos(searchTerm: string) {
    const filteredResult = todoList.todos.filter((todo: Todo) => 
      todo.title.trim()
                .toLocaleLowerCase()
                .includes(searchTerm.trim()
                                    .toLocaleLowerCase()) 
        || todo.description.trim()
                      .toLocaleLowerCase()
                      .includes(searchTerm.trim()
                                          .toLocaleLowerCase()));
    setDisplayList([...filteredResult]);
    dispatch({
      type: 'searched',
      activePage: 1,
      totalCount: filteredResult.length,
    });
  }

  // TODO: move save to context
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    setDisplayList(todoList.todos);

    if (todoList.paging.totalCount === 0) {
      id.current = 0;
    }
    localStorage.setItem('id', JSON.stringify(id.current));
  }, [todoList.todos]);

  return (
    <main className="App__todo-list">
      <AddTodo onAdd={(title: string, description: string) => {
        dispatch({
          type: 'added',
          id: ++id.current, 
          title, 
          description
        })
      }}
      />
      <Search placeholder='Search by title or description' onSearch={searchTodos} />
      {displayList
        .slice(todoList.paging.startIndex, todoList.paging.endIndex)
        .map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)}
      <Paging/>
    </main>
  );
}