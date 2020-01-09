import React, { Component } from "react";
import PageTitle from "../../sharedComponents/PageTitle";
import userService from "../../services/UserService";
import InnerBgImg from "./close_w.svg";
import "./Calendar.css";
import moment from "moment";
import CalendarDay from "../CalendarDay/CalendarDay";

export default class Calendar extends Component {

    constructor(props) {
        super(props);
    this.userService = new userService();
    this.state = {
      currentDate : moment()
    }
    }

    componentDidMount() {
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
        {this.state.user && <h1>{moment(this.state.user.plants[0].tasks[0].begin_day).add(1,"days").format("dd")}</h1>}   
        <CalendarDay daySlug={"S"} weatherIcon={}></CalendarDay>
      </div>
    );
  }
}
