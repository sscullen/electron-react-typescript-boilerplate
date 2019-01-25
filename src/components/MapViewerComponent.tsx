
import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


export interface MapProps { compiler: string; framework: string; }
export interface MapState { workers: any[]; tasks: any[]; }

const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg"
  });


class MapViewerComponent extends React.Component {
    state: MapState = {
      workers: [],
      tasks: [],
    };

    constructor(props: MapProps) {
      super(props);

      // This binding is necessary to make `this` work in the callback
      this.updateWorkerServer = this.updateWorkerServer.bind(this);
      this.handleStyleLoad = this.handleStyleLoad.bind(this);

    }

    updateWorkerServer(id: string, newValue: string) {

      console.log('Example function');

    }

    handleStyleLoad(map: any){
        return map.resize()
    }

    componentDidMount() {
      console.log("App mounted");
    //   Map.updateSize();
    }

    render() {
      return (
        <Map
            style="mapbox://styles/mapbox/light-v9"
            containerStyle={{
                height: "100%",
                width: "100%"
            }}
            onStyleLoad={this.handleStyleLoad}>
            <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
            </Layer>
        </Map>


      );
    }
  }

  export default MapViewerComponent;