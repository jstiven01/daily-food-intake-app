import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkingIsLogged } from '../redux/auth/actions';
import Home from './Home';
import Nutrients from './Nutrients';
import Measurements from './Measurements';

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { checkingIsLogged, history } = this.props;
    checkingIsLogged(history);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/main" component={Nutrients} />
          <Route exact path="/nutrient/:id/measurements" component={Measurements} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkingIsLogged: history => dispatch(checkingIsLogged(history)),
});

App.propTypes = {
  checkingIsLogged: PropTypes.func.isRequired,
};


export default withRouter(connect(null, mapDispatchToProps)(App));
