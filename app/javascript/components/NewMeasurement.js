import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircleSlider } from 'react-circle-slider';
import { postMeasurement } from '../redux/measurement/actions';

const Measurement = ({
// eslint-disable-next-line react/prop-types
  match, postMeasurement, history,
}) => {
  // eslint-disable-next-line react/prop-types
  const { params: { id, nutrient } } = match;

  const [form, setState] = useState({
    amount: 0.0,
  });
  const goalsNutrients = {
    Protein: 50,
    Fat: 65,
    Carbs: 300,
  };

  const goal = goalsNutrients[nutrient];


  const handleChange = value => {
    setState({
      ...form,
      amount: value.toFixed(2),
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    postMeasurement(id, form.amount, nutrient, history);
  };


  return (

    <div className="col-12 p-0">
      <div className="col-12 main-bk-color color-text nav-top-app text-center">
        <h2 className="top-title">New Measurement</h2>
      </div>
      <div className="new-edit-msm">
        <div className="d-flex flex-column text-center">
          <div className="nutrient-title-bk my-5">
            <p className="nutrient-title">
              <strong>
                {nutrient}
                {' '}
                (grams)
              </strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form-section my-5">
            <div className="range my-5">
              <CircleSlider
                value={form.amount}
                onChange={handleChange}
                progressColor="#ADDC91"
                size={600}
                showTooltip
                min={0}
                max={goal}
                stepSize={0.01}
                tooltipSize={50}
              />
            </div>
            <button type="submit" className="btn btn-lg btn-primary my-5 btn-form">Create Measurement</button>
          </form>
        </div>
      </div>


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
  postMeasurement: (id, data, nutrient, history) => dispatch(
    postMeasurement(id, data, nutrient, history),
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Measurement));
