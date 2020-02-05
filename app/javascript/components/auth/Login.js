import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userPostLogin } from '../../redux/auth/actions';


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
    event.preventDefault();
    // eslint-disable-next-line react/prop-types
    const { userPostLogin, history } = this.props;
    userPostLogin(history, this.state);
  }

  render() {
    const {
      email, password,
    } = this.state;
    return (
      <div className="col-12 mt-4">
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
              className="form-control"
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
              className="form-control"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  userPostLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  userPostLogin: (history, userInfo) => dispatch(userPostLogin(history, userInfo)),
});

export default withRouter(connect(null, mapDispatchToProps)(Login));
