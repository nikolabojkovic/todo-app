import { useEffect, useState } from 'react'
import { Todo } from "../models/todo";
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { Paging } from './Paging';
import { Search } from './Search';
import { useTodoList } from '../context/TodosContext';
import { TodoTabs } from './TodoTabs';
import { FilterTodos } from './FilterTodos';

export function TodoList() {
  const todoList = useTodoList();

  // TODO: move save to context
  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList.originalList));
  }, [todoList.originalList]);

  return (
    <main className="App__todo-list">
      <TodoTabs>
        <AddTodo key="add-todo" />
        <Search 
          key="search-todos" 
          placeholder='Search by title or description' 
        />
        <FilterTodos key="filter-todos" />
      </TodoTabs>
      {todoList.displayList
        .slice(todoList.paging.startIndex, todoList.paging.endIndex)
        .map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)}
      <Paging/>
    </main>
  );
}