import React, {Component} from 'react';
import './App.css';
import Map from './Map';
import { Button } from 'antd';
import 'antd/dist/antd.dark.css'
import axios from 'axios';
import { render } from '@testing-library/react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  mapPage = React.createRef();

  handleSubmit = () => {
    //let data = this.mapPage.current.state.draw.getAll()
    const features = this.mapPage.current.state.features;
    console.log(features);
    let data = {};
    data['displayFieldName'] = '';
    data['fieldAliases'] = {
      FID: 'FID',
      NAME: 'NAME',
      Shape_Length:	"Shape_Length",
      Shape_Area:	"Shape_Area",
    };
    data['geometryType'] = 'esriGeometryPolygon';
    data['spatialReference'] = {
      wkid: 4326,
      latestWkid: 4326,
    };
    data['fields'] = [
      {name: 'FID', type: 'esriFieldTypeOID', alias: "FID"},
      {name: 'NAME', type: 'esriFieldTypeString', alias: "NAME", length: 128},
      {name: 'Shape_Length', type: 'esriFieldTypeDouble', alias: 'Shape_Length'},
      {name: 'Shape_Area', type: 'esriFieldTypeDouble', alias: 'Shape_Area'},
    ];
    data['features'] = [];

    let index = 0;
    features.map((item)=>{
      let newItem = {}
      newItem['attributes'] = {
        FID: index, 
        NAME: item.attributes.NAME,
        Shape_Length: null,
        Shape_Area: null,
      };
      index = index + 1;
      const ring = item.geometry.coordinates
      newItem['geometry'] = {rings: ring};
      data.features = data.features.concat(newItem);
    });

    console.log(data);

    axios.post('http://127.0.0.1:5000/entropy', data)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
  };

  render() {
    return (
      <div className="App">
          <div className="title">
            Streets' Entropy Calculator
            <br/>
            <i className="author-name">Xuefei & Jingyuan</i>
          </div>
        <Button className="submit-button" onClick={this.handleSubmit}>Submit</Button>
        <Map ref={this.mapPage}>
        </Map>
      </div>
    );
  }
}

export default App;
