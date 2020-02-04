import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMeasurements } from '../redux/measurements/actions';

// eslint-disable-next-line react/prop-types
const Measurements = ({ match, measurementsData, getMeasurements }) => {
  // eslint-disable-next-line react/prop-types
  const { params: { id } } = match;

  useEffect(() => {
    getMeasurements(id);
  }, []);

  const jsxMeasurements = measurementsData.map(msm => (
    <div key={msm.id}>
      <Link to={`/nutrient/${id}/measurement/${msm.id}`}>
        Edit
      </Link>
      <p>
        amount :
        {msm.amount}
      </p>
      <p>
        date:
        {msm.date_intake}
      </p>
    </div>
  ));

  return (
    <div>
      <h1>Measurements</h1>
      {jsxMeasurements}
    </div>

  );
};

Measurements.propTypes = {
  measurementsData: PropTypes.arrayOf(PropTypes.shape({
    amount: PropTypes.number,
    date_intake: PropTypes.string,
  })).isRequired,
  getMeasurements: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  measurementsData: state.measurements.measurements,
});

const mapDispatchToProps = dispatch => ({
  getMeasurements: id => dispatch(getMeasurements(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Measurements);
