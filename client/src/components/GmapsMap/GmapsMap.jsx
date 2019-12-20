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
    componentWillMount() {
      const refs = {};
      console.log(this.props)
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
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import { compose, withProps, lifecycle } from "recompose"

// import React, { Component } from "react";

// const mapStyles = {
//   width: "100%",
//   height: "100%"
// };

// const throttle = (func, limit) => {
//   let lastFunc
//   let lastRan
//   return function() {
//     const context = this
//     const args = arguments
//     if (!lastRan) {
//       func.apply(context, args)
//       lastRan = Date.now()
//     } else {
//       clearTimeout(lastFunc)
//       lastFunc = setTimeout(function() {
//         if ((Date.now() - lastRan) >= limit) {
//           func.apply(context, args)
//           lastRan = Date.now()
//         }
//       }, limit - (Date.now() - lastRan))
//     }
//   }
// }

// class GmapsMap extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       stores: [
//         { lat: 47.49855629475769, lng: -122.14184416996333 },
//         { latitude: 47.359423, longitude: -122.021071 },
//         { latitude: 47.2052192687988, longitude: -121.988426208496 },
//         { latitude: 47.6307081, longitude: -122.1434325 },
//         { latitude: 47.3084488, longitude: -122.2140121 },
//         { latitude: 47.5524695, longitude: -122.0425407 }
//       ],
//       plant: {
//         lat: 0,
//         lng: 0,
//       }
//     };
//   }

//   componentWillMount() {
//     const refs = {}

//     this.setState({
//         position: null,
//         onMarkerMounted: ref => {
//             refs.marker = ref;
//         },

//         onPositionChanged: () => {
//             const position = refs.marker.getPosition();
//             console.log(position.toString());
//         }
//     })
// }

//   displayMarkers = () => {

//       return (
//         <Marker
//           draggable={true}
//           position={{
//             // lat: this.state.plant.lat,
//             // lng: this.state.plant.lng
//             lat: 40,
//             lng: 3
//           }}
//           icon={ { url: this.props.picture, size: {width: 60, height: 60}, anchor: {x: 15, y: 30}, scaledSize: {width: 30, height: 30}, }}
//           //onDragend ={ e => this.props.handleChange(e.position)}
//           // ref={this.state.onMarkerMounted} onPositionChanged={this.state.onPositionChanged}
//           onClick={e=> console.log(this.props.google.map)}
//         />
//       );
//   };

//   render() {
//     return (
//       <Map
//         google={this.props.google}
//         zoom={8}
//         style={mapStyles}
//         initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
//         fullscreenControl={false}
//       >
//         {this.displayMarkers()}
//       </Map>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCm0meO5cjbh70YvG6BIQVh5GqRHXHG7Uw"
// })(GmapsMap);
