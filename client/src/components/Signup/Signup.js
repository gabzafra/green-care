import React, { Component } from "react";
import "./Signup.css";
import PageTitle from "../../sharedComponents/PageTitle";
import Signup from "./StyledSignup";
import AuthService from "../../services/AuthService";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: "",
    passwordR: "",
    error: ""
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleSignUp = e => {
    e.preventDefault();
    if (this.state.password === this.state.passwordR) {
      const { history, setUser } = this.props;
      this.authService.signup(this.state).then(
        user => {
          setUser(user);
          history.push("/login");
        },
        error => {
          this.setState({ ...this.state, error: error });
        }
      );
    } else {
      this.setState({ ...this.state, error: "Password don't match" });
    }
  };

  render() {
    const { username, password, passwordR, error } = this.state;
    return (
      <React.Fragment>
        <PageTitle src="./images/green_care_w.svg" alt="green care logo" logoutHandler={this.props.handleLogout} />
        <form className="form-wrapper" onSubmit={this.handleSignUp}>
          <Signup
            username={username}
            password={password}
            passwordR={passwordR}
            handleChange={this.handleChange}
            placeholder={"User name"}
            error={error}
          ></Signup>
        </form>
      </React.Fragment>
    );
  }
}
