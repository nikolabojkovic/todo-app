import { Button, Form, Stack } from 'react-bootstrap';
import { useTodoList, useTodoListDispatch } from '../context/TodoListContext';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IAction } from '../models/Action';
import { todoServiceInstance } from '../services/TodoService';
import { first } from 'rxjs';
import { ITodo } from '../models/Todo';

type Props = {
  placeholder: string
};

export function Search({ placeholder }: Props) {
  const dispatch = useTodoListDispatch();
  const todoList = useTodoList();

  function handleSearch(searchTerm: string) {
    todoServiceInstance.getList(
      todoList.filter, 
      todoList.sort,
      searchTerm)
      .pipe(first())
      .subscribe((list: ITodo[]) => { 
        dispatch({
          type: 'searched',
          payload: {
            searchTerm,
            list: list,
            activePage: 1,
          }
        } as IAction);
    });
  }

  return (
    <Form className="todo-background p-1">
      <Stack direction="horizontal" gap={3}>
        <Form.Group className="me-auto m-2 w-100">
          <Form.Control 
            type="text" 
            placeholder={placeholder} 
            size="sm" 
            value={todoList.search.searchTerm}
            onChange={(e) => {
              const searchTerm = e.target.value;
                dispatch({
                  type: 'searchTerm-updated',
                  payload: {
                    searchTerm
                  }
                } as IAction);
                if (searchTerm === '') {
                  handleSearch(e.target.value);
                }
              }}
          />
          {todoList.search.searchTerm !== '' && <FontAwesomeIcon 
            className="clear-icon" 
            icon={faCircleXmark}
            onClick={() => {
              handleSearch('');
            }}
          />}
        </Form.Group>
        <Button 
          variant="warning"
          className="me-2 action-button"
          size="sm"
          disabled={!todoList.search.searchTerm || todoList.search.searchTerm.trim() === ''}
          onClick={() => {
            handleSearch(todoList.search.searchTerm);
          }}
        >
          Search
        </Button>
      </Stack>
    </Form>
  );
}