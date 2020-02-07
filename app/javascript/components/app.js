import React from 'react';
import {
  Switch, Route, withRouter, Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { checkingIsLogged, logOutUser } from '../redux/auth/actions';
import Home from './Home';
import Nutrients from './Nutrients';
import Measurements from './Measurements';
import Measurement from './Measurement';
import NewMeasurement from './NewMeasurement';
import Progresses from './Progresses';

class App extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { checkingIsLogged, history } = this.props;
    checkingIsLogged(history);
  }

  handleClick(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    // eslint-disable-next-line react/prop-types
    const { logOutUser, history } = this.props;
    logOutUser();
    // eslint-disable-next-line react/prop-types
    history.push('/');
  }

  render() {
    const { currentUserIsLogged } = this.props;
    let classCss = '';
    if (currentUserIsLogged) {
      classCss = 'container-app';
    } else {
      classCss = 'container-home';
    }
    return (
      <div className="container-fluid p-0 main-container">
        <div className={`row ${classCss}`}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/main" component={Nutrients} />
            <Route exact path="/nutrient/:id/measurements" component={Measurements} />
            <Route exact path="/nutrient/:id/new/measurement" component={NewMeasurement} />
            <Route exact path="/nutrient/:idn/measurement/:idm" component={Measurement} />
            <Route exact path="/myProgress" component={Progresses} />
          </Switch>
        </div>
        {currentUserIsLogged
          ? (
            <div className="col-12 p-0 dark-panel d-flex justify-content-around">
              <div className="add-measure align-self-center">
              <Link to="/main">
                  <p>
                    Add Measure
                  </p>
                </Link>
              </div>
              <div className="add-measure align-self-center">
                <Link to="/myProgress">
                  <p>
                    My Progress
                  </p>
                </Link>
              </div>
              <div className="add-measure align-self-center">
                <button type="button" onClick={this.handleClick.bind(this)} className="button-logout">Log Out</button>
              </div>
            </div>
          )
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserIsLogged: state.currentUser.isLogged,
});
const mapDispatchToProps = dispatch => ({
  checkingIsLogged: history => dispatch(checkingIsLogged(history)),
  logOutUser: () => dispatch(logOutUser()),
});

App.propTypes = {
  checkingIsLogged: PropTypes.func.isRequired,
  logOutUser: PropTypes.func.isRequired,
  currentUserIsLogged: PropTypes.bool.isRequired,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
