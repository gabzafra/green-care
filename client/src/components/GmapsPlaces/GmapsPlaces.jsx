import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import React, { Component } from "react";
import userService from "../../services/UserService";
import InnerBgImg from "./close_g.svg";
import "./GmapsPlaces.css";
import { Link } from "react-router-dom";
import LoadingOverlay from "../../sharedComponents/LoadingOverlay";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class GmapsMap extends Component {
  constructor(props) {
    super(props);
    this.userService = new userService();
    this.state = {
      users: null,
      loadingFlag: true,
      getAside: false
    };
  }

  componentWillMount() {
    this.userService.getUsers().then(users =>
      this.setState({
        ...this.state,
        users: users,
        loadingFlag: false
      })
    );
  }

  displayMarkers = (location, idx) => {
    return (
      <Marker
        key={idx}
        draggable={false}
        position={{
          lat: location.lat,
          lng: location.lng
        }}
        icon={{
          url: location.picture,
          size: { width: 60, height: 60 },
          anchor: { x: 15, y: 30 },
          scaledSize: { width: 30, height: 30 }
        }}
        text={location.name}
        onClick={e =>
          this.props.history.push({
            pathname: "/user-detail",
            state: { id: location.id }
          })
        }
      />
    );
  };

  render() {
    let locations = null;
    if (this.state.users) {
      locations = this.state.users
        .map(user => {
          return user.locations.map(location => ({
            lat: location[0],
            lng: location[1],
            name: user.username,
            id: user.id,
            picture: user.picture
          }));
        })
        .flat();
    }
    return (
      <React.Fragment>
        {this.state.loadingFlag ? (
          <LoadingOverlay />
        ) : (
          <div className="map-wrapper">
            <Map
              className="map"
              google={this.props.google}
              zoom={15}
              style={mapStyles}
              initialCenter={{
                lat: 40.00017181918281,
                lng: -3.500384701223889
              }}
              fullscreenControl={false}
            >
              {locations.map((location, idx) =>
                this.displayMarkers(location, idx)
              )}
            </Map>
            <Link to={{ pathname: "/main" }}>
              <button
                className="map-btn"
                onClick={this.toggleMap}
                style={{ backgroundImage: "url(" + InnerBgImg + ")" }}
              ></button>
            </Link>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCm0meO5cjbh70YvG6BIQVh5GqRHXHG7Uw"
})(GmapsMap);
