import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkingIsLogged } from '../redux/auth/actions';
import Home from './Home';
import Nutrients from './Nutrients';

class App extends React.Component {
  componentDidMount() {
    const { checkingIsLogged } = this.props;
    checkingIsLogged();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/main" component={Nutrients} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  checkingIsLogged: () => dispatch(checkingIsLogged()),
});


export default connect(null, mapDispatchToProps)(App);
