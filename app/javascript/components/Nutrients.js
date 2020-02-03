import React from 'react';
import { connect } from 'react-redux';

const Nutrients = ({ userData }) => {
  console.log('userData', userData);

  return (
    <div>
      <h1>NUTRIENTS:    </h1>
    </div>
  );
};

const mapStateToProps = state => ({
  userData: state,
});

export default connect(mapStateToProps)(Nutrients);
