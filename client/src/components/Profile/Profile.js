import React, { Component } from "react";
import "./Profile.css";
import ImageLoader from "../../fontStyles/ImageLoader";
import ModalButtons from "../../fontStyles/ModalButtons";
import userService from "../../services/UserService";
import capitalize from "../../globalStyles/utils";
import LoadingOverlay from "../../fontStyles/LoadingOverlay";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.userService = new userService();
    this.state = {
      user: null,
      loadingFlag: true,
      email: "",
      current_pass: "",
      new_pass: "",
      repeat_pass: ""
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleUpload = e => {
    const uploadData = new FormData();
    uploadData.append("picture", e.target.files[0]);

    this.setState({ ...this.state, loadingFlag: true });
    this.userService.uploadUserImage(uploadData).then(
      data => {
        this.setState({
          ...this.state,
          user: { ...this.state.user, picture: data.secure_url },
          loadingFlag: false
        });
      },
      error => {
        console.error(error);
      }
    );
  };

  handleUpdate = e => {
    let { user } = this.state;
    e.preventDefault();
    const { history } = this.props;
    user = {
      ...this.state.user,
      email: this.state.email,
      current_pass: this.state.current_pass,
      new_pass: this.state.new_pass,
      repeat_pass: this.state.repeat_pass
    };
    this.userService.updateUserProfile(user).then(() => history.push("/main"));
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      user: { ...this.props.loggedInUser },
      email: this.props.loggedInUser.email,
      loadingFlag: false
    });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        {this.state.loadingFlag ? (
          <LoadingOverlay />
        ) : (
          user && (
            <React.Fragment>
              <h1>{capitalize(user.username)}</h1>
              <form>
                <ImageLoader
                  picture={user.picture}
                  handleUpload={this.handleUpload}
                  flavour="signup"
                />
                <label htmlFor="email">User email</label>
                <input className="big-input"
                  type="email"
                  name="email"
                  value={this.state.email}
                  id="email"
                  onChange={this.handleChange}
                />
                <p>If you want to change your password</p>
                <label htmlFor="current-pass">Enter current password</label>
                <input className="small-input"
                  type="password"
                  name="current_pass"
                  id="current-pass"
                  onChange={this.handleChange}
                />
                <label htmlFor="new-pass">Enter new password</label>
                <input className="small-input"
                  type="password"
                  name="new_pass"
                  id="new-pass"
                  onChange={this.handleChange}
                />
                <label htmlFor="repeat-pass">Repeat new password</label>
                <input className="small-input"
                  type="password"
                  name="repeat_pass"
                  id="repeat-pass"
                  onChange={this.handleChange}
                />
              </form>
              <ModalButtons updateHandler={this.handleUpdate} />
            </React.Fragment>
          )
        )}
      </React.Fragment>
    );
  }
}
