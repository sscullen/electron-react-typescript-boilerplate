import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import { Image as ImageLayer } from 'ol/layer'
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector'
import Static from 'ol/source/ImageStatic'
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';

import {register} from 'ol/proj/proj4.js';
import proj4 from 'proj4';

import {getCenter} from 'ol/extent.js';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer.js';
import {transform} from 'ol/proj.js';
import Static from 'ol/source/ImageStatic.js';
import OSM from 'ol/source/OSM.js';
import {register} from 'ol/proj/proj4.js';
import proj4 from 'proj4';

import 'ol/ol.css';

// new Map({
//   target: 'map',
//   layers: [
//     new TileLayer({
//       source: new XYZ({
//         url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//       })
//     })
//   ],
//   view: new View({
//     center: [0, 0],
//     zoom: 2
//   })
// });



// https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
          '+x_0=400000 +y_0=-100000 +ellps=airy ' +
          '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
          '+units=m +no_defs');

          proj4.defs('EPSG:32611', '+proj=utm +zone=11 +ellps=WGS84 +datum=WGS84 +units=m +no_defs' )

register(proj4);


import React from 'react';
// import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";


export interface MapProps { compiler: string; framework: string; }
export interface MapState { workers: any[]; tasks: any[]; map: any }

// const Map = ReactMapboxGl({
//     accessToken: "pk.eyJ1Ijoic2N1bGxlbiIsImEiOiJ1UVAwZ19BIn0.wn4ltQcyl9P5j3bAmNJEPg"
//   });
var gdal = require("gdal");


var imageExtent = [0, 0, 700000, 1300000];

var s2extent = [699960, 5590200, 809760, 5700000]

var map;
// var s2extent = [0, 0, 5490, 5490]

const {dialog} = require('electron').remote;
var fs = require('fs');
    
document.getElementById('select-file').addEventListener('click',function(){
    dialog.showOpenDialog(function (fileNames) {
        if(fileNames === undefined){
            console.log("No file selected");
        }else{
            document.getElementById("actual-file").innerText = fileNames[0];
            readFile(fileNames[0]);
        }
    }); 
},false);

function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
        if(err){
            alert("An error ocurred reading the file :" + err.message);
            return;
        }
        
        // document.getElementById("content-editor").value = data;
        // document.getElementById("actual-file").innerText = fileNames[0];
        var dataset = gdal.open("sample.shp");
        var layer = dataset.layers.get(0);

        console.log("number of features: " + layer.features.count());
        console.log("fields: " + layer.fields.getNames());
        console.log("extent: " + JSON.stringify(layer.extent));
        console.log("srs: " + (layer.srs ? layer.srs.toWKT() : 'null'));
    });
}

class OpenLayersMapViewerComponent extends React.Component {
    state: MapState = {
      workers: [],
      tasks: [],
      img_url: ""
    };

    constructor(props: MapProps) {
      super(props);

      // This binding is necessary to make `this` work in the callback
      this.updateWorkerServer = this.updateWorkerServer.bind(this);
      this.handleStyleLoad = this.handleStyleLoad.bind(this);
      this.handleFileSelect = this.handleFileSelect.bind(this);


    }

    updateWorkerServer(id: string, newValue: string) {

      console.log('Example function');

    }

    handleStyleLoad(map: any){
        return map.resize()
    }

    handleFileSelect(evt) {
        var files = evt.target.files; // FileList object

        var reader = new FileReader();

        reader.onload = function(e) {
            var rawData = reader.result;
            console.log(rawData)
            var fileDisplayArea = document.getElementById('image');
            // Create a new image.
            var img = new Image();
            // Set the img src property using the data URL.
            // img.src = reader.result;

            let blob = new Blob([reader.result])

            let url_source = URL.createObjectURL(blob)

            img.src = url_source;

            // Add the image to the page.
            fileDisplayArea.appendChild(img);

            const s2image_layer = new ImageLayer({
                source: new Static({
                    url: url_source,
                    crossOrigin: '',
                    imageSize: [5490, 5490],
                    projection: 'EPSG:32611',
                    imageExtent: s2extent
                }),
                opacity: 0.85

            })

            map.addLayer(s2image_layer)
            console.log(s2image_layer)
            console.log(map)




        }

    // reader.readAsDataURL(files[0])
    reader.readAsArrayBuffer(files[0])

        // reader.readAsBinaryString(files[0]);

//         // files is a FileList of File objects. List some properties.
//         var output = [];
//         let file;
//         for (var i = 0, f; f = files[i]; i++) {
//           output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
//                       f.size, ' bytes, last modified: ',
//                       f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
//                       '</li>');
//                       console.log(f)
//                       file = f;
//         }

//         document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
//         console.log(file)
//         var reader = new FileReader();

//         console.log(file);
//         console.log('file.size-' + file.size);
//         console.log('file.type-' + file.type);
//         console.log('file.acutalName-' + file.name);

//         let start = performance.now();

//         var mime = file.type, // store mime for later
//           rd = new FileReader(); // create a FileReader

//           rd.onload = function(e) {

//             var blob = new Blob([e.target.result], {type: mime}),
//                       url = URL.createObjectURL(blob),
//                       img = new Image();

//             img.onload = function() {
//                                   console.log('image');
//                                   console.dir('this.height-' + this.height);
//                 console.dir('this.width-' + this.width);
//                                   URL.revokeObjectURL(this.src);     // clean-up memory
//                 console.log(start - performance.now());// add image to DOM
//             }

//                           img.src = url;

//           };

//         var chunk = file.slice(0, 1024 * 1024 * 10); // .5MB
//         rd.readAsArrayBuffer(chunk); // read file object

// //     //   // Closure to capture the file information.
// //     //   reader.onload = ((theFile) => {
// //     //     return (e) => {
// //     //       // Render thumbnail.
// //     //       var span = document.createElement('span');
// //     //       span.innerHTML = ['<img class="thumb" src="', e.target.result,
// //     //                         '" title="', escape(theFile.name), '"/>'].join('');
// //     //       document.getElementById('list').insertBefore(span, null);
// //     //       console.log(e)
// //     //       console.log(theFile)
// //     //       this.setState({
// //     //           img_url: e.target.result
// //     //       })

// //     //       const s2image_layer = new ImageLayer({
// //     //         source: new Static({
// //     //           url: e.target.result,
// //     //           crossOrigin: '',
// //     //           imageSize: [5490, 5490],
// //     //           projection: 'EPSG:32611',
// //     //           imageExtent: s2extent
// //     //         }),
// //     //         opacity: 0.85

// //     //       })

// //     //       map.addLayer(s2image_layer)
// //     //       console.log(s2image_layer)
// //     //       console.log(map)
// //     //     };
// //     //   })(file_ref);

// //     //   reader.addEventListener("loadend", function() {
// //     //     // reader.result contains the contents of blob as a typed array
// //     //   });
// //     //  reader.readAsArrayBuffer(file_ref);

// //     //  console.log(URL.createObjectURL(file_ref))

// //     //  const s2image_layer = new ImageLayer({
// //     //             source: new Static({
// //     //               url: URL.createObjectURL(file_ref)
// //     //               crossOrigin: '',
// //     //               imageSize: [5490, 5490],
// //     //               projection: 'EPSG:32611',
// //     //               imageExtent: s2extent
// //     //             }),
// //     //             opacity: 0.85

// //     //           })

// //     //           map.addLayer(s2image_layer)
// //     //           console.log(s2image_layer)
// //     //           console.log(map)

// //         reader.onload = function(readerEvt) {

// //             // This is done just for the proof of concept
// //         var binaryString = evt.target.result;
// //         var base64 = btoa(binaryString);
// //         var blobfile = atob(base64);
// //         var MIMEType = file_ref.type;

// //         window.blobFromBlobFile = b64toBlob(base64, MIMEType, 512);
// //         window.blobURL = URL.createObjectURL(window.blobFromBlobFile);

// //         console.log(blobURL)

// //         console.log('FUICK EVERYTHING')

// //         const s2image_layer = new ImageLayer({
// //                         source: new Static({
// //                           url: blobURL
// //                           crossOrigin: '',
// //                           imageSize: [5490, 5490],
// //                           projection: 'EPSG:32611',
// //                           imageExtent: s2extent
// //                         }),
// //                         opacity: 0.85

// //                       })

// //                       map.addLayer(s2image_layer)
// //                       console.log(s2image_layer)
// //                       console.log(map)
// //                       document.getElementById("imageid").src = blobURL;


// //         // if (MIMEType != "image/jpeg") {
// //         // var a = "<br /><a href=\"" + window.blobURL + "\">Blob File Link</a>";
// //         // } else {
// //         // var a = "<img src=" + window.blobURL + "\>";
// //         // }

// //         // document.getElementById('byte_content').innerHTML = a;

// //   };

// //   reader.readAsBinaryString(file_ref);
// //     }

    }

    componentDidMount() {
      console.log("App mounted");
      // Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
    //   Map.updateSize();
      // create feature layer and vector source
      var featuresLayer = new VectorLayer({
        source: new VectorSource({
          features:[]
        })
      });

      document.getElementById('files').addEventListener('change', this.handleFileSelect, false);


     const imageLayer = new ImageLayer({
        source: new Static({
          url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/' +
                 'British_National_Grid.svg/2000px-British_National_Grid.svg.png',
          crossOrigin: '',
          projection: 'EPSG:27700',
          imageExtent: imageExtent
        })
      })

      var file = new File(["foo"], "foo.txt", {
        type: "text/plain",
      });


      console.log(file)

      // create map object with feature layer
      map = new Map({
        target: this.refs.mapContainer,
        layers: [
          //default OSM layer
          new TileLayer({
            source: new OSM()
          }),
        ],
        view: new View({
          center: [-11718716.28195593, 4869217.172379018], //Boulder
          zoom: 13,
        })
      });

      map.on('click', this.handleMapClick.bind(this));

      // save map and layer references to local state
      this.setState({
        map: map,
        featuresLayer: featuresLayer
      });

    }

    // // pass new features from props into the OpenLayers layer object
    // componentDidUpdate(prevProps, prevState) {
    //   this.state.featuresLayer.setSource(
    //     new VectorLayer({
    //       features: this.props.routes
    //     })
    //   );
    // }

    handleMapClick(event) {

    //   // create WKT writer
    //   var wktWriter = new ol.format.WKT();

    //   // derive map coordinate (references map from Wrapper Component state)
    //   var clickedCoordinate = this.state.map.getCoordinateFromPixel(event.pixel);

    //   // create Point geometry from clicked coordinate
    //   var clickedPointGeom = new ol.geom.Point( clickedCoordinate );

    //   // write Point geometry to WKT with wktWriter
    //   var clickedPointWkt = wktWriter.writeGeometry( clickedPointGeom );

    //   // place Flux Action call to notify Store map coordinate was clicked
    //   Actions.setRoutingCoord( clickedPointWkt );

        console.log('printasldkfjl;kj')

    }

    render () {
      return (
        <div ref="mapContainer"> </div>
      );
    }
  }

  export default OpenLayersMapViewerComponent;

// <!DOCTYPE html>
// <html>
//   <head>
//     <title>Image Reprojection</title>
//     <link rel="stylesheet" href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
//     <!-- The line below is only needed for old environments like Internet Explorer and Android 4.x -->
//     <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=requestAnimationFrame,Element.prototype.classList,URL"></script>

//   </head>
//   <body>
//     <div id="map" class="map"></div>
//     <script>
//       import Map from 'ol/Map.js';
//       import View from 'ol/View.js';
//       import {getCenter} from 'ol/extent.js';
//       import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer.js';
//       import {transform} from 'ol/proj.js';
//       import Static from 'ol/source/ImageStatic.js';
//       import OSM from 'ol/source/OSM.js';
//       import {register} from 'ol/proj/proj4.js';
//       import proj4 from 'proj4';

//       proj4.defs('EPSG:27700', '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 ' +
//           '+x_0=400000 +y_0=-100000 +ellps=airy ' +
//           '+towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 ' +
//           '+units=m +no_defs');
//       register(proj4);

//       var imageExtent = [0, 0, 700000, 1300000];

//       var map = new Map({
//         layers: [
//           new TileLayer({
//             source: new OSM()
//           }),
//           new ImageLayer({
//             source: new Static({
//               url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/' +
//                      'British_National_Grid.svg/2000px-British_National_Grid.svg.png',
//               crossOrigin: '',
//               projection: 'EPSG:27700',
//               imageExtent: imageExtent
//             })
//           })
//         ],
//         target: 'map',
//         view: new View({
//           center: transform(getCenter(imageExtent), 'EPSG:27700', 'EPSG:3857'),
//           zoom: 4
//         })
//       });
//     </script>
//   </body>
// </html>