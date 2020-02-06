import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getNutrients } from '../redux/nutrients/actions';

const Nutrients = ({ nutrientsData, getNutrients }) => {
  useEffect(() => {
    getNutrients();
  }, []);

  const jsxNutrients = nutrientsData.map(nutrient => (
    <div key={nutrient.id} className="nutrient">
      <Link to={`/nutrient/${nutrient.id}/measurements`}>
        <p>
          name :
          {nutrient.name}
        </p>
      </Link>
      <p>
        total:
        {nutrient.total_nutrient}
      </p>
      <p>
        units :
        {nutrient.units}
      </p>

    </div>
  ));


  return (

    <div className="col-12 p-0">
      <div className="col-12 main-bk-color color-text nav-top-app text-center">
        <h2 className="top-title">Daily Food Intake</h2>
      </div>
      <div className="col-12 section-statistics">
        statistics
      </div>
      <div className="col-12 nutrients-global">
        {jsxNutrients}
      </div>
    </div>

  );
};

Nutrients.propTypes = {
  nutrientsData: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    units: PropTypes.string,
  })).isRequired,
  getNutrients: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  nutrientsData: state.nutrients.nutrients,
});

const mapDispatchToProps = dispatch => ({
  getNutrients: () => dispatch(getNutrients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nutrients);
