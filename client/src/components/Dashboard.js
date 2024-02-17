import React, { useState, useEffect } from 'react';
import DisplayTable from './DisplayTable'; // Import the DisplayTable component
import '../styles/Dashboard.css'; // Import your CSS file for styling
import Dropdown from './Dropdown';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [dataFetched, setDataFetched] = useState(false); // State to track if data has been fetched
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  useEffect(() => {
    // Check if data has already been fetched
    if (!dataFetched) {
      fetch('http://localhost:8080/dashboard')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setProducts(data); // Set the fetched data to the products state
          setDataFetched(true); // Update state to indicate data has been fetched
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  }, [dataFetched]); // Empty dependency array means this effect runs once after the first render

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Apply search filter to current products only
  const filteredProducts = currentProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.price.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Change page
  const paginate = pageNumber => {
    if (pageNumber > Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(1);
    } else if (pageNumber <= 0) {
      setCurrentPage(Math.ceil(products.length / productsPerPage));
    } else {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <h1 className="heading-name">Transaction Dashboard</h1>
      </nav>
      <div className="dashboard-container">
        <div className="table-top">
          {/* Search bar */}
          <div className="search-container">
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          {/* Dropdown */}
          <div className="dropdown-container">
            <Dropdown />
          </div>
        </div>
        {dataFetched ? (
          <h3 className='page-no'>page no : {currentPage} / {products.length / productsPerPage} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; month - {months[currentPage-1]}</h3>
        ) : (
          <h3 className="page-no">Loading...</h3>
        )}
        <DisplayTable products={filteredProducts} />

        <div className='footer'>
          <button onClick={() => paginate(currentPage - 1)}>Prev</button>
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;