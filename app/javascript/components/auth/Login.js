import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loginErrors: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const {
      email, password,
    } = this.state;
    const { handleSuccessfulAuth } = this.props;

    axios
      .post(
        '/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true },
      )
      .then(response => {
        if (response.status === 200) {
          handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('Login error', error);
      });
    event.preventDefault();
  }

  render() {
    const {
      email, password,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
};


export default Login;
