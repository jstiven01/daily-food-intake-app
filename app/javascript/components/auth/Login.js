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
    const { errorLoginData } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="col-12 forms">
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

          <button type="submit" className="btn btn-primary input-font-size">Login</button>
        </form>
        {errorLoginData === '' ? null : <div className="alert alert-warning sign-up-warning">{errorLoginData}</div>}
      </div>
    );
  }
}
Login.propTypes = {
  userPostLogin: PropTypes.func.isRequired,
  errorLoginData: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  errorLoginData: state.currentUser.errorLogin,
});

const mapDispatchToProps = dispatch => ({
  userPostLogin: (history, userInfo) => dispatch(userPostLogin(history, userInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
