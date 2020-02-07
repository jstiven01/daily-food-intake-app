import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';


const Chart = ({ data }) => {
  const dateFormat = {
    scales: {
      xAxes: [{

        type: 'time',
        time: {
          unit: 'day',
          unitStepSize: 1,
          displayFormats: {
            day: 'MMM DD',
          },
        },
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  };

  return (
    <div>
      <Bar data={data} options={dateFormat} />
    </div>
  );
};

Chart.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};
export default Chart;
