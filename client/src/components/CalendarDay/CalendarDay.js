import React, { Component } from "react";
import "./CalendarDay.css";

export default class CalendarDay extends Component {
  render() {
    return (
      <div className="day-container">
      <div className="task-wrapper">
        <span className="day-slug">{this.props.daySlug}</span>
        <div className="links-wrapper">
          <div className="task-pic task-pic-blue"></div>
          <div className="task-pic task-pic-red"></div>
          <div className="task-pic task-pic-blue"></div>
          <div className="task-pic task-pic-blue"></div>
          <div className="task-pic task-pic-red"></div>
          <div className="task-pic task-pic-blue"></div>
        </div>  
      </div>  
        <img className="weather-icon" src={this.props.weatherIcon} alt="" />
      </div>
    );
  }
}
