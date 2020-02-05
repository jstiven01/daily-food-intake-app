import React from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

const Home = () => (
  <div className="container-fluid">
    <div className="row">
      <div className="col-12 nav-top">
        <h1>Daily Food Intake</h1>
      </div>
      <SignUp />
      <Login />
    </div>
  </div>
);

export default Home;
