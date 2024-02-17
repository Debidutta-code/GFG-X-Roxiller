import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import '../styles/Statistics.css';
import BarChart from './BarChart';

const Statistics = () => {
    const { month } = useParams();
    const [statistics, setStatistics] = useState(null);
    const [barChartData, setBarChartData] = useState(null);
    const history = useHistory();

    useEffect(() => {
        // Fetch statistics data for the selected month
        fetch(`http://localhost:8080/statistics/${month}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setStatistics(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setStatistics(null); // Set statistics to null to trigger re-render
            });

        // Fetch bar chart data for the selected month
        fetch(`http://localhost:8080/bar-chart/${month}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setBarChartData(data);
            })
            .catch(error => {
                console.error('Error fetching bar chart data:', error);
                setBarChartData(null); // Set bar chart data to null to trigger re-render
            });
    }, [month]);

    const back = () => {
        history.goBack();
    };

    // Function to calculate the total sale amount in rs
    const calculateTotalSaleInRs = () => {
        if (!statistics) return 0;
        return statistics.reduce((total, item) => {
            return item.sold ? total + item.price : total;
        }, 0);
    };

    // Function to count the number of objects with 'sold' property set to true
    const countSoldItems = () => {
        if (!statistics) return 0;
        return statistics.filter(item => item.sold).length;
    };

    // Function to count the number of objects with 'sold' property set to false
    const countNotSoldItems = () => {
        if (!statistics) return 0;
        return statistics.filter(item => !item.sold).length;
    };

    return (
        <div>
            <nav className="navbar">
                <h1 className="heading-name">Statistics - {month}</h1>
            </nav>

            <button className='back-button' onClick={back}>Dashboard</button>
            <div className="statistics-container">
                <div className="card">
                    <h2>Statistics - {month}</h2>
                    {statistics ? (
                        <div>
                            <p>Total sale price : {calculateTotalSaleInRs()}</p>
                            <p>Total number of items sold: {countSoldItems()}</p>
                            <p>Total number of items not sold: {countNotSoldItems()}</p>
                        </div>
                    ) : (
                        <div className="loading">Loading...</div>
                    )}
                </div>
                <div className="card">
        <h2>Bar Chart Status - {month}</h2>
        {barChartData ? (
          <BarChart barChartData={barChartData} />
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
            </div>
        </div>
    );
};

export default Statistics;
