import React, { Component } from 'react';
import "./CalendarDay.css";

export default class CalendarDay extends Component {
    render() {
        return (
            <div className="day-container">
                <span className="day-slug">{this.props.daySlug}</span>
                <img className="weather-icon" src={this.props.weatherIcon} alt=""/>
            </div>
        )
    }
}
