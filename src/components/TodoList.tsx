import { useEffect, useRef, useState } from 'react'
import { Todo } from "../models/todo";
import { AddTodo } from './AddTodo';
import { TodoItem } from './TodoItem';
import { Paging } from './Paging';

export function TodoList() {
  const [todoList, setTodoList] = useState(JSON.parse(localStorage.getItem('todo-list') ?? "[]") as Todo[]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const id = useRef(JSON.parse(localStorage.getItem('id') ?? "0"));

  function addTodo(title: string, description: string) {
    setTodoList([
      ...todoList, 
      {
        id: ++id.current, 
        title, 
        description,
        completed: false,
        createdAt: new Date()
      } as Todo]);
  }

  function deleteTodo(id: number) {
    setTodoList(todoList.filter(item => item.id !== id));
  }

  function completeTodo(id: number) {
    setTodoList(todoList.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: true}
      } else {
        return todo
      }
    }));
  }

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    localStorage.setItem('id', JSON.stringify(id.current));
  }, [todoList]);

  return (
    <main className="App__todo-list">
      <AddTodo onAdd={addTodo}/>
      {todoList.slice(startIndex, endIndex).map((todo: Todo) => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onDelete={deleteTodo} 
          onComplete={completeTodo}/>
      ))}
      <Paging 
        totalCount={todoList.length} 
        updateOffset={(start: number, end: number) => {
          setStartIndex(start);
          setEndIndex(end);
        }}
      />
    </main>
  );
}