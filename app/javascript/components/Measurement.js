import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircleSlider } from 'react-circle-slider';
import { getMeasurement, editMeasurement, deleteMeasurement } from '../redux/measurement/actions';

const Measurement = ({
// eslint-disable-next-line react/prop-types
  match, measurementData, getMeasurement, editMeasurement, deleteMeasurement, history,
}) => {
  // eslint-disable-next-line react/prop-types
  const { params: { idn, idm, nutrient } } = match;

  useEffect(() => {
    getMeasurement(idn, idm);
  }, []);

  const goalsNutrients = {
    Protein: 50,
    Fat: 65,
    Carbs: 300,
  };

  const goal = goalsNutrients[nutrient];

  const [form, setState] = useState({
    amount: 0.0,
  });

  const handleChange = value => {
    setState({
      ...form,
      amount: value.toFixed(2),
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.id === 'update-form') {
      editMeasurement(idn, idm, form.amount, nutrient, history);
    } else {
      deleteMeasurement(idn, idm, nutrient, history);
    }
  };

  let dateMeasurement;
  if (Object.keys(measurementData).length) {
    dateMeasurement = (
      <strong>
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        }).format(new Date(measurementData.date_intake)).replace(',', '')}
      </strong>
    );
  }


  return (
    <div className="col-12 p-0">
      <div className="col-12 main-bk-color color-text nav-top-app text-center">
        <h2 className="top-title">Measurement</h2>
      </div>
      <div className="new-edit-msm ">
        <p className="date-msm ml-5 py-3"><strong>Measurement to Edit or Delete</strong></p>
        <div className="measurement-data py-4 px-5">
          <div className="d-flex progress-data">
            <div className="info-msm flex-grow-1 description ml-5">
              <p className="my-0">
                {dateMeasurement}
              </p>
            </div>
            <div className="description">
              <p className="units-amount">
                <strong>
                  {measurementData.amount}
                </strong>
                <span>grams</span>
              </p>
            </div>
          </div>


        </div>


        <div className="d-flex flex-column text-center">
          <div className="nutrient-title-bk my-3">
            <p className="nutrient-title">
              <strong>
                {nutrient}
                {' '}
                (grams)
              </strong>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="form-section my-4" id="update-form">
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
                tooltipSize={60}
              />
            </div>
            <button type="submit" className="btn btn-lg btn-primary my-5 btn-form">Edit Measurement</button>
          </form>
          <form onSubmit={handleSubmit} id="delete-form">
            <button type="submit" className="btn btn-danger btn-form">Delete Measurement</button>
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
  getMeasurement: PropTypes.func.isRequired,
  editMeasurement: PropTypes.func.isRequired,
  deleteMeasurement: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  measurementData: state.measurement.measurement,
});

const mapDispatchToProps = dispatch => ({
  getMeasurement: (idn, idm) => dispatch(getMeasurement(idn, idm)),
  editMeasurement: (idn, idm, amount, nutrient, history) => dispatch(
    editMeasurement(idn, idm, amount, nutrient, history),
  ),
  deleteMeasurement: (idn, idm, nutrient, history) => dispatch(
    deleteMeasurement(idn, idm, nutrient, history),
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Measurement));
