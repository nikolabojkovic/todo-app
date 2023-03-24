import { Button, Form, Stack } from 'react-bootstrap';
import { useState } from 'react';

type Props = {
  placeholder: string,
  onSearch: any
};


export function Search({ onSearch, placeholder }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Form className="todo-background mb-3 p-3">
      <Stack direction="horizontal" gap={3}>       
        <Form.Control 
          type="text" 
          placeholder={placeholder} 
          size="sm" 
          className="me-auto"
          value={searchTerm}
          onChange={(e) => { 
            setSearchTerm(e.target.value);
            if (e.target.value === '') {
              onSearch(e.target.value);
            }
          }}
          />
          <Button 
            variant="warning"
            style={{ 
              backgroundColor: '#FE9801',
              color: 'white', 
              minWidth: '90px',
              borderRadius: '20px'
            }} 
            size="sm"
            disabled={!searchTerm || searchTerm.trim() === ''}
            onClick={() => {
              onSearch(searchTerm);
            }}
          >
            Search
          </Button>
      </Stack>
    </Form>
  );
}