import React from 'react';
import PropTypes from 'prop-types';

const Nutrients = ({ statusLogin }) => (
  <div>
    <h1>
      NUTRIENTS:
      {statusLogin}
    </h1>
  </div>
);
Nutrients.propTypes = {
  statusLogin: PropTypes.string.isRequired,
};
export default Nutrients;
