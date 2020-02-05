import React, { useState } from 'react';
import SignUp from './auth/SignUp';
import Login from './auth/Login';

const Home = () => {
  const [hiddenSignUp, setHidden] = useState(true);

  const handleClick = event => {
    if (event.target.id === 'signup') {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };
  return (
    <div className="container-fluid container-home main-bk-color">
      <div className="row container-home">
        <div className="col-12 nav-top align-self-end">
          <h1>Daily Food Intake</h1>
        </div>
        <div className={hiddenSignUp ? 'd-none' : 'mx-auto container-forms'}>
          <div className="col-10 my-3 main-bk-color p-0 ml-3 d-flex justify-content-around">
            <button className="buttons-home main-bk-color color-text" type="button" onClick={handleClick} id="login">Login</button>
            <span className="main-bk-color color-text auth-span">Sign Up</span>
          </div>
          <SignUp />
        </div>
        <div className={!hiddenSignUp ? 'd-none' : 'mx-auto container-forms'}>
          <div className="col-10 my-3 main-bk-color p-0 ml-3 d-flex justify-content-around">
            <span className="auth-span main-bk-color color-text">Login</span>
            <button className="buttons-home main-bk-color color-text" type="button" onClick={handleClick} id="signup">Sign Up</button>
          </div>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;
