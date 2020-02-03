import React, { Component } from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

class Home extends Component {
/*   constructor(props) {
    super(props);
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
  } */

  /*   handleSuccessfulAuth(data) {
    // eslint-disable-next-line react/prop-types
    const { history, handleLogin } = this.props;
    handleLogin(data);
    // eslint-disable-next-line react/prop-types
    history.push('/main');
  } */

  render() {
    return (
      <div>
        <h1>HOOOMEEEE</h1>

        <SignUp />
      </div>
    );
  }
}

export default Home;
