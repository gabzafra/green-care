

import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import React, { Component } from "react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

class GmapsMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        { lat: 47.49855629475769, lng: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 }
      ]
    };
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          draggable={true}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude
          }}
          icon={ { url: './images/daisy.jpg', size: {width: 60, height: 60}, anchor: {x: 15, y: 30}, scaledSize: {width: 30, height: 30}, }}
          onDragend={e => console.log(e)}
        />
      );
    });
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        initialCenter={{ lat: 47.444, lng: -122.176 }}
        fullscreenControl={false}
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCm0meO5cjbh70YvG6BIQVh5GqRHXHG7Uw"
})(GmapsMap);

