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

  getDaysArray = (days, plants) => {
    let firstDay = days[0].date;
    let numberOfDays = days.length;
    let tasksArr = plants.reduce((arr, plant) => {
      plant.tasks.forEach(task => {
        let dateArr = this.calendarService.getDaysWithTask(
          task.begin_day,
          firstDay,
          task.day_interval,
          numberOfDays
        );
        dateArr.forEach(date =>
          arr.push({
            date: date,
            type: task.type === "WATER" ? "blue" : "red",
            id: plant.id,
            picture: plant.picture
          })
        );
      });
      return arr;
    }, []);

    return days.map(day => {
      let tasks = tasksArr.filter(e => e.date === day.date).map(task=>[task.id,task.picture,task.type]);
      return { ...day, tasks: tasks };
    });
  };

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
            .then(user => {
              this.setState({
                ...this.state,
                user: user,
                loadingFlag: false,
                emptyCalendar: false,
                forecast: forecast
              });
            });
        });
    }
  }

  render() {
    let daysList = null;
    if (this.state.forecast && this.state.user.plants) {
      daysList = this.getDaysArray(this.state.forecast, this.state.user.plants);
    }
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
                {daysList &&
                  daysList.map((day, idx) => (
                    <CalendarDay
                      key={idx}
                      daySlug={moment(day.date).format("dd")}
                      weatherIcon={`./images/${day.icon}.svg`}
                      plantList={day.tasks}
                    ></CalendarDay>
                  ))}
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}
