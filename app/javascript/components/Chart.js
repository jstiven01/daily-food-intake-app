import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


const Chart = ({ data }) => {
  const dateFormat = {
    legend: {
      display: true,
      labels: {
        fontSize: 30,
        fontColor: '#8395A5',
        fontStyle: 'bold',
      },
    },

    scales: {
      xAxes: [{
        categoryPercentage: 1.5,
        barPercentage: 0.4,
        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          displayFormats: {
            day: 'MMM DD',
          },
        },
        ticks: {
          fontSize: 32,
        },
        gridLines: {
          display: false,
        },
      }],
      yAxes: [{
        ticks: {
          fontSize: 40,
          beginAtZero: true,
        },
        gridLines: {
          display: false,
        },

      }],
    },
  };

  return (
    <div className="chart-font-size">
      <Bar data={data} height={200} options={dateFormat} />
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
export default Chart;
