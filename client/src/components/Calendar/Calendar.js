import React, { Component } from "react";
import PageTitle from "../../sharedComponents/PageTitle";
import userService from "../../services/UserService";
import InnerBgImg from "./close_w.svg";
import "./Calendar.css";

export default class Calendar extends Component {

    constructor(props) {
        super(props);
    this.userService = new userService();
    }

    componentWillMount() {
        this.userService.getUserByIdDeep(this.props.loggedInUser.id).then(user =>
          this.setState({
            ...this.state,
            user: user,
            loadingFlag: false
          })
        );
      }
    
  render() {
    return (
      <div>
        <header>
          <PageTitle className="title-box" />
          <button
            className="close-btn"
            style={{ backgroundImage: "url(" + InnerBgImg + ")" }}
          ></button>
        </header>
        <h1>{this.props.loggedInUser.id}</h1>
      </div>
    );
  }
}
