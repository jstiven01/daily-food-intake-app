import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getMeasurement, editMeasurement, deleteMeasurement } from '../redux/measurement/actions';

const Measurement = ({
// eslint-disable-next-line react/prop-types
  match, measurementData, getMeasurement, editMeasurement, deleteMeasurement, history,
}) => {
  // eslint-disable-next-line react/prop-types
  const { params: { idn, idm } } = match;

  useEffect(() => {
    getMeasurement(idn, idm);
  }, []);

  const [form, setState] = useState({
    amount: 0.0,
  });

  const handleChange = event => {
    setState({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.id === 'update-form') {
      editMeasurement(idn, idm, form.amount);
    } else {
      deleteMeasurement(idn, idm, history);
    }
  };


  return (
    <div>
      <h1>Measurement ID</h1>
      <form onSubmit={handleSubmit} id="update-form">
        <div className="form-group">
          <div>
            New Amount:
          </div>
          <input
            type="number"
            name="amount"
            defaultValue={measurementData.amount}
            onChange={handleChange}
            className="form-control"
            step=".01"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Update Measurement</button>
      </form>
      <form onSubmit={handleSubmit} id="delete-form">
        <button type="submit" className="btn btn-danger">Delete Measurement</button>
      </form>
    </div>

  );
};

Measurement.propTypes = {
  measurementData: PropTypes.shape({
    amount: PropTypes.number,
    date_intake: PropTypes.string,
  }).isRequired,
  getMeasurement: PropTypes.func.isRequired,
  editMeasurement: PropTypes.func.isRequired,
  deleteMeasurement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  measurementData: state.measurement.measurement,
});

const mapDispatchToProps = dispatch => ({
  getMeasurement: (idn, idm) => dispatch(getMeasurement(idn, idm)),
  editMeasurement: (idn, idm, amount) => dispatch(editMeasurement(idn, idm, amount)),
  deleteMeasurement: (idn, idm, history) => dispatch(deleteMeasurement(idn, idm, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Measurement));
