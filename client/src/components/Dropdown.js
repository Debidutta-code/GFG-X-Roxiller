// Dropdown.js

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Dropdown.css';

const Dropdown = () => {
  const [selectedMonth, setSelectedMonth] = useState('March');
  const history = useHistory(); // Access the history object

  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const handleSelectMonth = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    history.push(`/statistics/${selectedMonth}`); // Redirect to Statistics page
  };

  return (
    <div className="dropdown-container">
      <select value={selectedMonth} onChange={handleSelectMonth}>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
