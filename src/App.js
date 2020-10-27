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
    let data = this.mapPage.current.state.draw.getAll()
    const features = this.mapPage.current.state.features;
    data.features = features;
    data['fields'] = [{name: 'NAME', type: 'String', alias: "NAME",length: 128}]
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
