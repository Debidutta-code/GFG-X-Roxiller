import React from 'react';

const DisplayTable = ({ products }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.sold.toString()}</td>
              <td><img src={product.image} alt={product.title} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
