import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import userPostFetch from '../../redux/auth/actions';

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
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    const { userPostFetch, history } = this.props;
    userPostFetch(history, this.state);
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
  userPostFetch: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  userPostFetch: (history, userInfo) => dispatch(userPostFetch(history, userInfo)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
