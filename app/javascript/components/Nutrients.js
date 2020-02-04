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
    <div key={nutrient.id}>
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
    <div>
      <h1>NUTRIENTS</h1>

      {jsxNutrients}
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
