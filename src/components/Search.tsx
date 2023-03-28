import { Button, Form, Stack } from 'react-bootstrap';
import { useTodoList, useTodoListDispatch } from '../context/TodosContext';

type Props = {
  placeholder: string
};

export function Search({ placeholder }: Props) {
  const dispatch = useTodoListDispatch();
  const todoList = useTodoList();

  function searchTodos(searchTerm: string) {
    dispatch({
      type: 'searched',
      searchTerm,
      activePage: 1,
    });
  }

  return (
    <Form className="todo-background p-1">
      <Stack direction="horizontal" gap={3}>       
        <Form.Control 
          type="text" 
          placeholder={placeholder} 
          size="sm" 
          className="me-auto m-2"
          value={todoList.search.searchTerm}
          onChange={(e) => { 
            dispatch({
              type: 'searchTerm-updated',
              searchTerm: e.target.value
            })
            if (e.target.value === '') {
              searchTodos(e.target.value);
            }
          }}
          />
          <Button 
            variant="warning"
            className="m-2"
            style={{ 
              backgroundColor: '#FE9801',
              color: 'white', 
              minWidth: '90px',
              borderRadius: '20px'
            }} 
            size="sm"
            disabled={!todoList.search.searchTerm || todoList.search.searchTerm.trim() === ''}
            onClick={() => {
              searchTodos(todoList.search.searchTerm);
            }}
          >
            Search
          </Button>
      </Stack>
    </Form>
  );
}