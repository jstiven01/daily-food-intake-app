import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>HOOOMEEEE</h1>

        <SignUp />
        <Login />


      </div>
    );
  }
}

export default Home;
