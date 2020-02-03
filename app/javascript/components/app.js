import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';
import Nutrients from './Nutrients';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      user: data,
    });
  }

  render() {
    const { loggedInStatus } = this.state;
    console.log('loggggg', loggedInStatus);
    return (
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  history={props.history}
                  handleLogin={this.handleLogin}
                  statusLogin={loggedInStatus}
                />
              )}
            />
            <Route
              exact
              path="/main"
              render={props => (
                <Nutrients history={props.history} statusLogin={loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
