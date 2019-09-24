import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { ReCaptcha } from "react-recaptcha-google";

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isVerified: false,
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  verifyCallback(recaptchaToken) {
    if (recaptchaToken) {
      this.setState({ isVerified: true, errors: {} });
    } else {
      this.setState({
        isVerified: false,
        errors: { recaptcha: "Please verify that you are a human!" }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
    }

    if (nextProps.auth.loading !== this.state.loading) {
      this.setState({ loading: nextProps.auth.loading });
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { email, password, isVerified } = this.state;

    const userData = {
      email,
      password
    };

    if (isVerified) {
      this.setState({
        errors: {}
      });
      this.props.loginUser(userData);
    } else {
      this.setState({
        errors: { recaptcha: "Please verify that you are a human!" }
      });
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { errors, loading } = this.state;
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {errors && errors.recaptcha ? (
              <div className="alert alert-warning" role="alert">
                {errors.recaptcha}
              </div>
            ) : null}
            <div
              className="card"
              style={{
                backgroundColor: "#3b3a30",
                textSshadow: "0 1px 3px rgba(0,0,0,.5)",
                color: "white"
              }}
            >
              <div
                className="card-header text-center"
                style={{
                  backgroundColor: "#212529",
                  textShadow: "0 1px 3px rgba(0,0,0,.5)",
                  color: "white"
                }}
              >
                <i className="fas fa-lock"></i> Login
              </div>

              <div className="card-body">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group row">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Username
                    </label>

                    <div className="col-md-6">
                      <input
                        type="text"
                        className={classnames("form-control", {
                          "is-invalid": errors.email
                        })}
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        required
                        autoFocus
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="form-group row">
                    <label
                      htmlFor="password"
                      className="col-md-4 col-form-label text-md-right"
                    >
                      Password
                    </label>

                    <div className="col-md-6">
                      <input
                        type="password"
                        className={classnames("form-control", {
                          "is-invalid": errors.password
                        })}
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        required
                      />
                      {errors.password && (
                        <div className="invalid-feedback">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="form-group row mb-0">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                      {!loading ? (
                        <button
                          type="submit"
                          className="btn btn-dark btn-block"
                        >
                          Login
                        </button>
                      ) : (
                        <button
                          className="btn btn-dark btn-block"
                          type="button"
                          disabled
                        >
                          <span
                            className="spinner-grow spinner-grow-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span className="sr-only">Loading...</span>
                        </button>
                      )}
                    </div>
                    <div className="col-md-4"></div>
                  </div>
                </form>
              </div>
            </div>
            <div className="container mt-3">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 d-flex justify-content-center">
                  <ReCaptcha
                    ref={el => {
                      this.captchaDemo = el;
                    }}
                    size="normal"
                    data-theme="dark"
                    render="explicit"
                    sitekey="<Your-Site-Key>"
                    onloadCallback={this.onLoadRecaptcha}
                    verifyCallback={this.verifyCallback}
                  />
                </div>
                <div className="col-md-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
