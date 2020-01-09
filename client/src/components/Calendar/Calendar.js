import React, { Component } from "react";
import PageTitle from "../../sharedComponents/PageTitle";
import userService from "../../services/UserService";
import InnerBgImg from "./close_w.svg";
import "./Calendar.css";
import moment from "moment";
import CalendarDay from "../CalendarDay/CalendarDay";
import { Link } from "react-router-dom";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.userService = new userService();
    this.state = {
      currentDate: moment()
    };
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
          <Link to={{ pathname: "/main" }}>
            <button
              className="close-btn"
              style={{ backgroundImage: "url(" + InnerBgImg + ")" }}
            ></button>
          </Link>
        </header>
        {this.state.user && (
          <React.Fragment>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(2, "days")
                .format("dd")}
              weatherIcon={"./images/cloud.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(3, "days")
                .format("dd")}
              weatherIcon={"./images/sun.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(4, "days")
                .format("dd")}
              weatherIcon={"./images/rain.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(5, "days")
                .format("dd")}
              weatherIcon={"./images/snowflake.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(2, "days")
                .format("dd")}
              weatherIcon={"./images/cloud.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(3, "days")
                .format("dd")}
              weatherIcon={"./images/sun.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(4, "days")
                .format("dd")}
              weatherIcon={"./images/rain.svg"}
            ></CalendarDay>
            <CalendarDay
              daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                .add(5, "days")
                .format("dd")}
              weatherIcon={"./images/snowflake.svg"}
            ></CalendarDay>
          </React.Fragment>
        )}
      </div>
    );
  }
}
