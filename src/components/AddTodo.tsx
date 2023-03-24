import { Button, Form, Stack } from 'react-bootstrap';
import { useState } from 'react';

export function AddTodo({ onAdd }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Form className="todo-background mb-3 p-3">
      <Stack direction="horizontal" gap={3}>        
        <Form.Control 
          type="text" 
          placeholder="Enter title" 
          size="sm" 
          value={title}
          onChange={(e) => setTitle(e.target.value)} 
        />
        <Form.Control 
          type="text" 
          placeholder="Enter description" 
          size="sm" 
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
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
          disabled={!title || title.trim() === '' || !description || description.trim() === ''}
          onClick={() => {
            onAdd(title, description);
            setTitle('');
            setDescription('');
          }}
        >
          Add
        </Button>
      </Stack>
    </Form>
  )
}