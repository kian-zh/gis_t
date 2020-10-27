import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl';
//  import turf from 'turf'
import MapboxDraw from 'mapbox-gl-draw'
import './Map.css';
//  import axios from 'axios';
import { Modal } from 'antd';
import 'antd/dist/antd.dark.css'

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: {},
            draw: {},
            isModal: false,
            inputName: '',
            features: [],
        }
    }

    onCreateItem = (e)=>{
        this.setState({isModal: true})
        var data = this.state.draw.getAll()
        let features = this.state.features
        const listLength = data.features.length
        const addedItem = data.features[listLength-1]
        features = features.concat(addedItem)
        this.setState({features: features})
          //var area = turf.area(data)
          //var rounded_area = Math.round(area * 100) / 100
          //alert('添加成功')

        /*
        const listLength = data.features.length;
        for (let i = 0;i < listLength;i ++){
            data.features[i]['name']=`第${(i+1).toString()}个`;
        }
        */
        console.log(data.features);
        //  发请求
        /*
        axios.post('http://localhost:5000/entropy', data.features)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        */
    }

    handleOk = () => {
        const listLength = this.state.features.length;
        const features = this.state.features;
        features[listLength-1]['attributes'] = {NAME: this.state.inputName};
        this.setState({
            isModal: false, 
            inputName: '',
            features: features,
        });
    };

    handleChange = (event) => {
        this.setState({inputName: event.target.value});
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
        map.on('draw.create', this.onCreateItem)
        //map.on('draw.delete', this.updateArea)
        //map.on('draw.update', this.updateArea)

        this.setState({
            map:map,
            draw:draw,
        });
    }

    render() {
        return (
        <div>

            <div id="map" className="map">
            </div>

            <Modal
                title=""
                visible={this.state.isModal}
                onOk={this.handleOk}
                closable={false}
                cancelButtonProps={{ disabled: true }}
            >
                <p>Enter the name of this zone.</p>
                <input type="text" className="textInput" onChange={this.handleChange}></input>
            </Modal>
        </div>
        );
    }
}

export default Map;