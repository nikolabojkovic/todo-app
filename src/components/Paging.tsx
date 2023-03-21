import Pagination from 'react-bootstrap/Pagination';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';

type Props = {
  totalCount: number;
  updateOffset: any;
};

export function Paging({ totalCount, updateOffset }: Props) {
  const [active, setActive] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const pageCount = Math.ceil(totalCount / itemsPerPage);
  let pages = [];

  for (let number = 1; number <= pageCount; number++) {
    pages.push(
      <Pagination.Item key={number} active={number === active} onClick={() => { 
        setActive(number);
        updateOffset((number - 1) * itemsPerPage, number * itemsPerPage);
      }}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <section className="paging-container mt-3">
      <Stack direction="horizontal" gap={3}>
        <span>Page {active} of {pageCount}</span>
        <span className="ms-auto d-flex flex-row">
          <span>Page size:{' '}</span>
          <Form.Select 
            aria-label="Page size" 
            size="sm"
            onChange={(e) => { 
              setItemsPerPage(+e.target.value);
              setActive(1);
              updateOffset((1 - 1) * +e.target.value, 1 * +e.target.value);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Form.Select>
        </span>      
        <Pagination size="sm">{pages}</Pagination>
      </Stack>
    </section>
  )
}