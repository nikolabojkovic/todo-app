import { Button, Stack } from 'react-bootstrap';
import { Todo } from '../models/todo';

const buttonStyle : any = { 
  backgroundColor: '#F5F6F7', 
  borderRadius: '20px', 
  minWidth: '90px'
}

type Props = {
  todo: Todo;
  onDelete: any;
  onComplete: any
};

export function TodoItem({ todo, onDelete, onComplete }: Props){

  return (
      <div className="App__todo-list__item">
        <Stack direction="horizontal" gap={3}>
          <div>
            <div className={ todo.completed 
                ? "App__todo-list__item-title--completed" 
                : "App__todo-list__item-title" 
            }>
              { todo.title }
            </div>
            <div className={
              todo.completed 
                ? "App__todo-list__item-description--compleated" 
                : "App__todo-list__item-description"
              }>
                <span>{todo.description}</span>
                <span>{' '}{new Date(todo.createdAt).toLocaleDateString()}</span>
            </div>
          </div>     
          { !todo.completed &&
            <Button 
              className="ms-auto"
              variant="outline-success" 
              size="sm"
              style={ buttonStyle }
              onClick={() => onComplete(todo.id)}
            >
              Complete
            </Button>
          }
          <Button 
            className= { todo.completed ? "ms-auto" : "" } 
            variant="outline-danger" 
            size="sm" 
            style={ buttonStyle }
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </Button>
        </Stack>
      </div>
  )
}