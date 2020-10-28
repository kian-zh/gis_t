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
    data['features'] = [];
    let index = 0;
    features.map((item)=>{
      let newItem = {}
      newItem['attributes'] = {FID: index, NAME: item.attributes.NAME};
      index = index + 1;
      const ring = item.geometry.coordinates
      newItem['geometry'] = {rings: ring};
      data.features = data.features.concat(newItem);
    });
    data['fields'] = [
      {name: 'FID', type: 'esriFieldTypeOID', alias: "FID"},
      {name: 'NAME', type: 'esriFieldTypeString', alias: "NAME", length: 128},
    ];
    data['geometryType'] = 'esriGeometryPolygon';
    data['fieldAliases'] = {
      FID: 'FID',
      NAME: 'NAME',
    };
    data['displayFieldName'] = '';
    data['spatialReference'] = {
      wkid: 4326,
      latestWkid: 4326,
    };



    console.log(features)
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
