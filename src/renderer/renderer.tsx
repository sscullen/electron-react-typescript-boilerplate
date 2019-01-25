import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import './style.scss';
import 'mapbox-gl/dist/mapbox-gl.css'


import MapViewerComponent from '../components/MapViewerComponent';
import OpenLayersMapViewerComponent from '../components/OpenLayersMapViewerComponent';


import MapContainer from './components/map-container';

ReactDOM.render(
<<<<<<< HEAD
  <div className="mapContainer">
    <h4>Welcome to React, Typescript, and Electron</h4>
    <OpenLayersMapViewerComponent />
=======
  <div className="main-content">
    <h4>Welcome to React, Typescript, and Electron</h4>
    {/* <div id="mapid" /> */}
    <MapContainer />
    <div>Sup</div>
    <h3>Hello There!</h3>
>>>>>>> e1e57bf2d62960787834410474f0127ee744b24c
  </div>,
  document.getElementById('app')
);
