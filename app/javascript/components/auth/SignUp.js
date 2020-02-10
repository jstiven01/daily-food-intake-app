import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userPostSignUp } from '../../redux/auth/actions';

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
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
    const { userPostSignUp, history } = this.props;
    userPostSignUp(history, this.state);
  }

  render() {
    const {
      name, email, password, passwordConfirmation,
    } = this.state;
    const { errorSignUpData } = this.props;
    return (
      <div className="col-12 forms">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              value={name}
              onChange={this.handleChange}
              className="form-control input-font-size"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              className="form-control input-font-size"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
              className="form-control input-font-size"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="Password confirmation"
              value={passwordConfirmation}
              onChange={this.handleChange}
              className="form-control input-font-size"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary input-font-size">Register</button>
        </form>
        {errorSignUpData === '' ? null : <div className="alert alert-warning sign-up-warning">This email already exists or wrong password confirmation!!</div>}
      </div>
    );
  }
}
SignUp.propTypes = {
  userPostSignUp: PropTypes.func.isRequired,
  errorSignUpData: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  errorSignUpData: state.currentUser.errorSignUp,
});

const mapDispatchToProps = dispatch => ({
  userPostSignUp: (history, userInfo) => dispatch(userPostSignUp(history, userInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
