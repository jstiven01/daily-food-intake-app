import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProgresses } from '../redux/progresses/actions';
import Chart from './Chart';

const Progresses = ({ progressesData, getProgresses }) => {
  useEffect(() => {
    getProgresses();
  }, []);


  const jsxProgressNutrients = progressesData.map(prg => (
    <div key={prg.name} className="col-12 progress-section mx-auto mt-2">
      <h4 className="progress-title"><strong>{prg.name}</strong></h4>
      <Chart data={prg} />
    </div>
  ));


  return (

    <div className="col-12 p-0">
      <div className="col-12 main-bk-color color-text nav-top-app text-center">
        <h2 className="top-title">My Progress</h2>
      </div>
      <div className="histograms mt-4">
        {progressesData[0].datasets.length === 0
          ? <p className="description mx-auto text-center">Please add one Measurement !!</p>
          : jsxProgressNutrients}
      </div>

    </div>
  );
};
Progresses.propTypes = {
  progressesData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    datasets: PropTypes.arrayOf(PropTypes.shape({
      length: PropTypes.integer,
    })),
  })).isRequired,
  getProgresses: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  progressesData: state.progresses.progresses,
});

const mapDispatchToProps = dispatch => ({
  getProgresses: () => dispatch(getProgresses()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Progresses);
