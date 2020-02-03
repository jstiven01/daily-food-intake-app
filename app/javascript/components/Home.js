import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  }

  handleSuccessfulAuth(data) {
    // eslint-disable-next-line react/prop-types
    const { history, handleLogin } = this.props;
    handleLogin(data);
    // eslint-disable-next-line react/prop-types
    history.push('/main');
  }

  render() {
    const { statusLogin } = this.props;

    return (
      <div>
        <h1>HOOOMEEEE</h1>
        {statusLogin}

        <SignUp handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
    );
  }
}

Home.propTypes = {
  statusLogin: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Home;
