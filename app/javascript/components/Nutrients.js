import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getNutrients } from '../redux/nutrients/actions';

const Nutrients = ({ nutrientsData, getNutrients }) => {
  useEffect(() => {
    getNutrients();
  }, []);

  const jsxNutrients = nutrientsData.map(nutrient => (
    <div key={nutrient.id}>
      <p>
        name :
        {nutrient.name}
      </p>
      <p>
        total:
        {nutrient.total}
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
  nutrientsData: PropTypes.arrayOf.isRequired,
  getNutrients: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  nutrientsData: state.nutrients.nutrients,
});


const mapDispatchToProps = dispatch => ({
  getNutrients: () => dispatch(getNutrients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Nutrients);
