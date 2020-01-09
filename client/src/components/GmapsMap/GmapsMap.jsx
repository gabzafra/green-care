import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCm0meO5cjbh70YvG6BIQVh5GqRHXHG7Uw&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  lifecycle({
    componentDidMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: ref => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          this.props.handleChange({lat:position.lat(),lng:position.lng()})
        }
      });
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lng }}>
    {props.isMarkerShown && (
      <Marker 
        position={{ lat: props.lat, lng: props.lng }}
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
        icon={ { url: props.picture, size: {width: 60, height: 60}, anchor: {x: 15, y: 30}, scaledSize: {width: 30, height: 30}, }}
      />
    )}
  </GoogleMap>
));

class MyParentComponentWrapper extends React.PureComponent {
  state = {
    isMarkerShown: false
  };

  render() {
    return (
      <div>
        <MyMapComponent lat={this.props.lat} lng={this.props.lng} picture={this.props.picture} handleChange={this.props.handleChange} isMarkerShown={true} />
      </div>
    );
  }
}

export default MyParentComponentWrapper;