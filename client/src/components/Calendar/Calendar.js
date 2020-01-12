import React, { Component } from "react";
import PageTitle from "../../sharedComponents/PageTitle";
import userService from "../../services/UserService";
import calendarService from "../../services/CalendarService";
import InnerBgImg from "./close_w.svg";
import "./Calendar.css";
import moment from "moment";
import CalendarDay from "../CalendarDay/CalendarDay";
import { Link } from "react-router-dom";
import LoadingOverlay from "../../sharedComponents/LoadingOverlay";

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.userService = new userService();
    this.calendarService = new calendarService();
    this.state = {
      loadingFlag: true,
      emptyCalendar: true
    };
  }

  getDaysArray = () => {};

  componentDidMount() {
    if (this.props.loggedInUser.locations.length > 0) {
      let forecast = null;
      this.calendarService
        .getForecast(
          this.props.loggedInUser.locations[0][0],
          this.props.loggedInUser.locations[0][1]
        )
        .then(res => {
          forecast = res.data.map(day => ({
            date: day.valid_date,
            icon: this.calendarService.getIcon(day.weather.code)
          }));
          return this.userService
            .getUserByIdDeep(this.props.loggedInUser.id)
            .then(user =>
              this.setState({
                ...this.state,
                user: user,
                loadingFlag: false,
                emptyCalendar: false,
                forecast: forecast
              })
            );
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loadingFlag ? (
          <LoadingOverlay />
        ) : (
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
            {this.state.emptyCalendar && (
              <h1>You have no plants yet, go back and add some !</h1>
            )}
            {this.state.user && (
              <React.Fragment>
                <CalendarDay
                  daySlug={moment(this.state.user.plants[0].tasks[0].begin_day)
                    .add(2, "days")
                    .format("dd")}
                  weatherIcon={"./images/cloud.svg"}
                  plantList={[
                    [
                      "5e1acc411d756eca3a6e0d26",
                      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Brassica_juncea_var._juncea_3.JPG",
                      "blue"
                    ],
                    [
                      "5e1acc411d756eca3a6e0d26",
                      "https://upload.wikimedia.org/wikipedia/commons/5/5c/Brassica_juncea_var._juncea_3.JPG",
                      "red"
                    ]
                  ]}
                ></CalendarDay>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
