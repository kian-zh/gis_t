import React from 'react';
import './App.css';
import Map from './Map';

function App() {
  return (
    <div className="App">
        <div className="title">
          Streets' Entropy Calculator
          <br/>
          <i className="authorName">Xuefei & Jingyuan</i>
        </div>
      <Map>
      </Map>
    </div>
  );
}

export default App;
