import React from 'react';
import { useTable } from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';


const QuoteLineItems = ({ lineItems }) => {
  // Define columns for the React Table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // Key for lineItems
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Quantity',
        accessor: 'quantity',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Total Price',
        accessor: (row) => row.quantity * row.price, // Calculated value
      }
    ],
    []
  );

  // Define data for the React Table
  const data = React.useMemo(() => lineItems, [lineItems]);

  // Use the useTable hook from React Table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <div className="quote-line-items-table">
      <h4>Line Items:</h4>
      <table {...getTableProps()} className="table table-bordered table-hover">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuoteLineItems;
