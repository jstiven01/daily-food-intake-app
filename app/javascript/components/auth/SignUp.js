import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      signUpErrors: '',
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
      name, email, password, passwordConfirmation,
    } = this.state;
    const { handleSuccessfulAuth } = this.props;

    axios
      .post(
        '/signup',
        {
          name,
          email,
          password,
          passwordConfirmation,
        },
        { withCredentials: true },
      )
      .then(response => {
        if (response.status === 201) {
          handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log('registration error', error);
      });
    event.preventDefault();
  }

  render() {
    const {
      name, email, password, passwordConfirmation,
    } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Enter your Name"
            value={name}
            onChange={this.handleChange}
            required
          />

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

          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Password confirmation"
            value={passwordConfirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}
SignUp.propTypes = {
  handleSuccessfulAuth: PropTypes.func.isRequired,
};


export default SignUp;
