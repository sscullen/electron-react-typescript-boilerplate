import * as React from 'react';

import 'leaflet/dist/leaflet.css';

import * as Leaflet from 'leaflet';

// mapbox html slippy tile url
//https://api.mapbox.com/styles/v1/scullen/cirz9eo0a0009g9m1xicz4bcg.html?fresh=true&title=true&access_token=pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg#0.9/-0.000000/0.000000/0

//styles/scullen/cirz9eo0a0009g9m1xicz4bcg

export default class MapContainer extends React.Component<any, any> {
  map: any;
  constructor(props: any) {
    super(props);
    this.state = {
      value: this.props.value,
    };

    this.map = null;
  }

  componentDidMount() {
    console.log('component mounted!');

    this.map = Leaflet.map('mapid').setView([45.39, -75.75], 13);
    Leaflet.tileLayer(
      'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken:
          'pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg',
      }
    ).addTo(this.map);
  }

  componentWillUnmount() {
    console.log('component is about to un-mount!');
  }

  render() {
    return (
      <div className="map-wrapper">
        <div id="mapid" />
      </div>
    );
  }
}
