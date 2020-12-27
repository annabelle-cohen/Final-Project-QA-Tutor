import React, { Component } from "react";
import "./signInStyle.css";
import Code from "./video/code5.mp4";
import { saveUser } from "../Actions/authActions";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      isLoggedIn: false,
      succeded: false,
      submitted: false,
    };

    this.props.saveUser({ user: {}, isLoggedIn: false });

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8092//acs/users/login/" + this.state.email)
      .then((response) => {
        if (response.status === 200) {
          this.setState({ succeded: true });
          response.json().then((d) => {
            const user = d;

            //this.displayNotifaction(true, "login succeeded!")
            if (user.password === this.state.password) {
              this.props.saveUser({ user, isLoggedIn: true });
              this.setState({ isLoggedIn: true });
            }
          });
        } else {
          console.log("Error:", response);
          response.json().then((d) => {
            this.displayNotifaction(false, d.message);
            console.log("Errordata", d);
          });
        }
        this.setState({ submitted: true });
      })
      .catch((error) => {
        console.error("Error:", error.data);
      });
  };

  loggedIn() {
    const isLoggedIn = this.state.isLoggedIn;
    const userRole = this.props.auth.user.roleEnum;
    const password = this.props.auth.password;
    console.log(isLoggedIn);
    if (isLoggedIn) {
      if (userRole === "ADMIN") {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/dashboard" />;
      }
    }
  }

  render() {
    return (
      <header class="v-header container">
        <div class="fullscreen-video-wrap">
          <video autoPlay loop muted>
            <source src={Code} type="video/mp4"></source>
          </video>
          <div class="header-overlay"></div>
          <div id="login-div" className="container">
            <div id="login-div2" className="card z-depth-0">
              <div id="login-card" className="card-content">
                <form id="login-form" onSubmit={this.handleSubmit}>
                  <span id="title" className="card-title">
                    Welcome
                  </span>
                  <div className="input-field ">
                    <label id="email" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="input-field">
                    <label id="password" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={this.handleChange}
                    ></input>
                  </div>
                  <div className="input-field">
                    <button
                      id="signIn-button"
                      className="btn grey darken-3 z-depth-3"
                    >
                      Login
                    </button>
                  </div>
                  {this.loggedIn()}
                </form>
              </div>
            </div>
          </div>
        </div>
        <section class="sec-bottom">
          <div id="sec-div" class="container1">
            © AAP
          </div>
        </section>
      </header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveUser: (user) => dispatch(saveUser(user)),
  };
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

const Login = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default Login;
