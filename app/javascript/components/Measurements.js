import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getMeasurements } from '../redux/measurements/actions';

// eslint-disable-next-line react/prop-types
const Measurements = ({ match, measurementsData, getMeasurements }) => {
  // eslint-disable-next-line react/prop-types
  const { params: { id } } = match;

  useEffect(() => {
    getMeasurements(id);
  }, []);

  const today = new Date();
  const todayWithHoursZero = today.setHours(0, 0, 0, 0);
  const yesterday = (d => new Date(d.setDate(d.getDate() - 1)))(new Date());
  const yesterdayWithHoursZero = yesterday.setHours(0, 0, 0, 0);
  const lastSevenDays = (d => new Date(d.setDate(d.getDate() - 7)))(new Date());
  const lastSevenDaysWithHoursZero = lastSevenDays.setHours(0, 0, 0, 0);

  const measurementsToday = measurementsData
    .filter(msm => new Date(msm.date_intake).setHours(0, 0, 0, 0) === todayWithHoursZero);
  const measurementsYesterday = measurementsData
    .filter(msm => new Date(msm.date_intake).setHours(0, 0, 0, 0) === yesterdayWithHoursZero);
  const measurementsLastWeek = measurementsData
    .filter(msm => new Date(msm.date_intake).setHours(0, 0, 0, 0) < yesterdayWithHoursZero
    && new Date(msm.date_intake).setHours(0, 0, 0, 0) >= lastSevenDaysWithHoursZero);


  const jsxMeasurementsToday = measurementsToday.map(msm => (
    <div key={msm.id} className="measurement-data py-4 px-5 border">

      <div className="d-flex progress-data">
        <div className="text-center circle align-self-center circle-progress-m">
          <CircularProgressbar
            className="align-self-center"
            value={50}
            styles={buildStyles({
              textColor: '#8395A5',
              pathColor: '#ADDC91',
              trailColor: '#E8FCFF',
            })}
          />
        </div>
        <div className="info-msm flex-grow-1 description ml-5">
          <p className="my-0">
            <strong>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }).format(new Date(msm.date_intake)).replace(',', '')}
            </strong>
          </p>
          <span className="percentage-info">Percentage</span>
        </div>
        <div className="description">
          <p className="units-amount">
            <strong>
              {msm.amount}
            </strong>
            <span>grams</span>
          </p>
        </div>
        <div className="description link-edit-delete">
          <Link to={`/nutrient/${id}/measurement/${msm.id}`}>
            <p>&gt;</p>
          </Link>
        </div>
      </div>


    </div>
  ));

  const jsxMeasurementsYesterday = measurementsYesterday.map(msm => (
    <div key={msm.id} className="measurement-data py-4 px-5 border">

      <div className="d-flex progress-data">
        <div className="text-center circle align-self-center circle-progress-m">
          <CircularProgressbar
            className="align-self-center"
            value={50}
            styles={buildStyles({
              textColor: '#8395A5',
              pathColor: '#ADDC91',
              trailColor: '#E8FCFF',
            })}
          />
        </div>
        <div className="info-msm flex-grow-1 description ml-5">
          <p className="my-0">
            <strong>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }).format(new Date(msm.date_intake)).replace(',', '')}
            </strong>
          </p>
          <span className="percentage-info">Percentage</span>
        </div>
        <div className="description">
          <p className="units-amount">
            <strong>
              {msm.amount}
            </strong>
            <span>grams</span>
          </p>
        </div>
        <div className="description link-edit-delete">
          <Link to={`/nutrient/${id}/measurement/${msm.id}`}>
            <p>&gt;</p>
          </Link>
        </div>
      </div>


    </div>
  ));

  const jsxMeasurementsLastWeek = measurementsLastWeek.map(msm => (
    <div key={msm.id} className="measurement-data last-msm py-4 px-5 border">

      <div className="d-flex progress-data">
        <div className="text-center circle align-self-center circle-progress-m">
          <CircularProgressbar
            className="align-self-center"
            value={50}
            styles={buildStyles({
              textColor: '#8395A5',
              pathColor: '#ADDC91',
              trailColor: '#E8FCFF',
            })}
          />
        </div>
        <div className="info-msm flex-grow-1 description ml-5">
          <p className="my-0">
            <strong>
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }).format(new Date(msm.date_intake)).replace(',', '')}
            </strong>
          </p>
          <span className="percentage-info">Percentage</span>
        </div>
        <div className="description">
          <p className="units-amount">
            <strong>
              {msm.amount}
            </strong>
            <span>grams</span>
          </p>
        </div>
        <div className="description link-edit-delete">
          <Link to={`/nutrient/${id}/measurement/${msm.id}`}>
            <p>&gt;</p>
          </Link>
        </div>
      </div>


    </div>
  ));


  return (
    <div className="col-12 p-0">
      <div className="col-12 main-bk-color color-text nav-top-app text-center">
        <div className="top-title d-flex">
          <p className="flex-grow-1 my-0 text-right pl-5">Measurements</p>
          <p className="flex-grow-1 my-0 pr-4 text-right">
            <Link to={`/nutrient/${id}/new/measurement`} className="link-add-measurement">
              +
            </Link>
          </p>
        </div>
      </div>
      <div className="all-measurements">
        <div className="measurements-section">
          {measurementsToday.length > 0 ? <p className="date-msm ml-5 my-3"><strong>Today</strong></p> : null}
          {measurementsToday.length > 0 ? jsxMeasurementsToday : null }
        </div>
        <div className="measurements-section">
          {measurementsYesterday.length > 0 ? <p className="date-msm ml-5 my-3"><strong>Yesterday</strong></p> : null}
          {measurementsYesterday.length > 0 ? jsxMeasurementsYesterday : null}
        </div>
        <div className="measurements-section">
          {measurementsLastWeek.length > 0 ? <p className="date-msm ml-5 my-3"><strong>Last Week</strong></p> : null }
          {measurementsLastWeek.length > 0 ? jsxMeasurementsLastWeek : null}
        </div>
      </div>
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
