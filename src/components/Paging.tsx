import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Stack, Container, Row, Col } from 'react-bootstrap';
import { useTodoList, useTodoListDispatch } from '../context/TodosContext';

export function Paging() {
  const todoList = useTodoList();
  const dispatch = useTodoListDispatch();

  const [itemsPerPage, setItemsPerPage] = useState(todoList.paging.itemsPerPage);

  const pageCount = Math.ceil(todoList.paging.totalCount / itemsPerPage);
  let pages = [];

  for (let number = 1; number <= pageCount; number++) {
    pages.push(
      <Pagination.Item key={number} active={number === todoList.paging.activePage} onClick={() => { 
        dispatch({
          type: 'paging-updated',
          activePage: number,
          itemsPerPage: itemsPerPage
        });
      }}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <section className="paging-container p-0 pb-2 mt-3">      
      <Container fluid>
        <Row xs={1} sm={3}>
          <Col sm={5} className="pt-2 d-flex justify-content-start">
            Page {todoList.paging.activePage} of {pageCount}
          </Col>
          <Col sm={5} className="pt-2">
            <Stack direction="horizontal" gap={2}>
              <div className='ms-sm-auto'>
                Page size:{' '}
              </div>
              <div>
                <Form.Select 
                    aria-label="Page size" 
                    size="sm"
                    onChange={(e) => { 
                      setItemsPerPage(+e.target.value);
                      dispatch({
                        type: 'paging-updated',
                        activePage: 1,
                        itemsPerPage: +e.target.value
                      });
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </Form.Select>
              </div>
            </Stack>
          </Col>
          <Col sm={2} className="pt-2 d-flex justify-content-start">
            <Pagination size="sm">{pages}</Pagination>
          </Col>
        </Row>
      </Container>
    </section>
  )
}