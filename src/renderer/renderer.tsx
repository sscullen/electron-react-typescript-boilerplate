import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import './style.scss';

import MapContainer from './components/map-container';

ReactDOM.render(
  <div className="main-content">
    <h4>Welcome to React, Typescript, and Electron</h4>
    {/* <div id="mapid" /> */}
    <MapContainer />
    <div>Sup</div>
    <h3>Hello There!</h3>
  </div>,
  document.getElementById('app')
);
