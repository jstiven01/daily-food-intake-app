import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMeasurements } from '../../redux/measurements/actions';
import Measurements from '../Measurements';

// eslint-disable-next-line react/prop-types
const MeasurementsContainer = ({ match, measurementsData, getMeasurements }) => {
// eslint-disable-next-line react/prop-types
  const { params: { id, nutrient } } = match;

  useEffect(() => {
    getMeasurements(id);
  }, []);
  return (
    <Measurements id={id} nutrient={nutrient} measurementsData={measurementsData} />
  );
};

MeasurementsContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MeasurementsContainer);
