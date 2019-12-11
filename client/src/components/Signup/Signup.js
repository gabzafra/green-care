import React, { Component } from "react";
import PageTitle from "../../fontStyles/PageTitle";
import LoadingOverlay from "../../fontStyles/LoadingOverlay";
import AuthService from "../../services/AuthService";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    username: "",
    password: "",
    picture: "",
    flag: false
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleSignUp = e => {
    e.preventDefault();
    const { history, setUser } = this.props;
    this.authService.signup(this.state).then(
      user => {
        setUser(user);
        history.push("/");
      },
      error => {
        console.error(error);
      }
    );
  };

  handleUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);
    this.setState({ ...this.state, flag: true });
    this.authService.upload(uploadData).then(
      data => {
        this.setState({ ...this.state, picture: data.secure_url, flag: false });
      },
      error => {
        console.error(error);
      }
    );
  };

  render() {
    const { username, password, picture } = this.state;
    return (
      <React.Fragment>
        {this.state.flag && <LoadingOverlay />}
        <PageTitle>SignUp</PageTitle>

        <form onSubmit={this.handleSignUp}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            value={password}
            name="password"
            required
            onChange={this.handleChange}
          />
          <input type="file" name="picture" onChange={this.handleUpload} />
          <input type="submit" value="Create account" />
        </form>
      </React.Fragment>
    );
  }
}
