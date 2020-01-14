import React, { Component } from "react";
import "./CalendarDay.css";
import { Link } from "react-router-dom";

export default class CalendarDay extends Component {
  render() {
    return (
      <div className="day-container">
        <div className="task-wrapper">
          <span className="day-slug">{this.props.daySlug}</span>
          <div  className="links-wrapper">
            {this.props.plantList.map((plant, idx) => (
              <Link
                key={idx}
                to={{
                  pathname: `/plant-update/${plant[0]}`,
                  state: {
                    flavour: "update"
                  }
                }}
              >
                <img
                  className={`task-pic task-pic-${plant[2]}`}
                  src={plant[1]}
                  alt=""
                />
              </Link>
            ))}
          </div>
        </div>
        <img className="weather-icon" src={this.props.weatherIcon} alt="" />
      </div>
    );
  }
}
