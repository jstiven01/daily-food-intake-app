import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { postMeasurement } from '../redux/measurement/actions';

const Measurement = ({
// eslint-disable-next-line react/prop-types
  match, postMeasurement, history,
}) => {
  // eslint-disable-next-line react/prop-types
  const { params: { id } } = match;

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
    postMeasurement(id, form.amount, history);
  };


  return (
    <div>
      <h1>Measurement</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div>
            New Amount:
          </div>
          <input
            type="number"
            name="amount"
            defaultValue={form.amount}
            onChange={handleChange}
            className="form-control"
            step=".01"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Create Measurement</button>
      </form>
    </div>

  );
};

Measurement.propTypes = {
  measurementData: PropTypes.shape({
    amount: PropTypes.number,
    date_intake: PropTypes.string,
  }).isRequired,
  postMeasurement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  measurementData: state.measurement.measurement,
});

const mapDispatchToProps = dispatch => ({
  postMeasurement: (id, data, history) => dispatch(postMeasurement(id, data, history)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Measurement));
