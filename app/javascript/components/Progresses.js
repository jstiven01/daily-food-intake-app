import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProgresses } from '../redux/progresses/actions';

const Progresses = ({ progressesData, getProgresses }) => {
  useEffect(() => {
    getProgresses();
  }, []);
  // let a  = progressesData.filter(prog => prog.keys('Protein'))
  // let { Protein } = progressesData[0];
  console.log('Progresses', progressesData.Protein);

  // console.log('isToday  :', isToday);


  return (
    <div>
      Progresses
    </div>


  );
};

Progresses.propTypes = {
  progressesData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    units: PropTypes.string,
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
