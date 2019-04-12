import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import './style.scss';
import 'mapbox-gl/dist/mapbox-gl.css'


import MapViewerComponent from '../components/MapViewerComponent';
import OpenLayersMapViewerComponent from '../components/OpenLayersMapViewerComponent';


import MapContainer from './components/map-container';

ReactDOM.render(
  <div className="mapContainer">
    <h4>Welcome to React, Typescript, and Electron</h4>
    <OpenLayersMapViewerComponent />
  </div>,
  document.getElementById('app')
);
