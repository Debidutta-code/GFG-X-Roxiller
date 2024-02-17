import React from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

const BarChart = ({ barChartData }) => {
  return (
    <div className="bar-chart">
      <VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        height={250}
        width={600}
      >
        <VictoryAxis
          tickValues={barChartData.map(item => item.range)}
          tickFormat={range => `${range}`}
          style={{
            tickLabels: {
              angle: -30,
              verticalAnchor: "middle",
              textAnchor: "end"
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={count => `${count}`}
        />
        <VictoryBar
          data={barChartData}
          x="range"
          y="count"
        />
      </VictoryChart>
    </div>
  );
};

export default BarChart;
