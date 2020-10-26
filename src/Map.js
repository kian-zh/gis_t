import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import turf from 'turf'
import MapboxDraw from 'mapbox-gl-draw'
import './Map.css';
import axios from 'axios';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {},
            draw: {},
        }            
    }

    updateArea = (e)=>{
        var data = this.state.draw.getAll()
        if (data.features.length > 0) {
          //var area = turf.area(data)
          //var rounded_area = Math.round(area * 100) / 100
          alert('添加成功')
        }
        const listLength = data.features.length;
        for (let i = 0;i < listLength;i ++){
            data.features[i]['name']=`第${(i+1).toString()}个`;
        }
        console.log(data.features);
        //  发请求
        axios.post('http://localhost:5000/entropy', data.features)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    componentDidMount() {

        mapboxgl.accessToken = 'pk.eyJ1IjoiemhhbmdqaW5neXVhbjEyMzQiLCJhIjoiY2pubTIyenhnMDJnMDN2cWhzczJocjhiaSJ9.HSC6WDbo_XmKCKHsFmQdtQ';

        const map = new mapboxgl.Map({
            style: 'mapbox://styles/mapbox/dark-v9',
            center: [114.220476,22.417594],
            zoom: 10,
            minZoom: 10,
            maxZoom: 16,
            container: 'map',
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
              polygon: true,
            }
          })
        
        map.addControl(draw)
        map.on('draw.create', this.updateArea)
        map.on('draw.delete', this.updateArea)
        map.on('draw.update', this.updateArea)

        this.setState({
            map:map,
            draw:draw,
        });
    }

    render() {
        return (
            <div id="map" className="map">
            </div>
        );
    }
}

export default Map;