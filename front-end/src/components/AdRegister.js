import React, {Component , useState} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import { adService } from '../services/ad.service'
import GMap from './Gmap'






class AdRegister extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            lat: null,
            lng: null
        } 

        this.locationHandler = this.locationHandler.bind(this);
    } 


    locationHandler(lat,lng) {
        this.setState({
            lat: lat,
            lng: lng
        });
    }

    render() { 
        return (
            <div >
                <h1>{this.state.lat} + {this.state.lng}</h1>
                <GMap action={this.locationHandler} withMarkers={false} ads = {[this.state.info]} height={"80vh"} width={"50%"} marginTop={"10px"}/>
            </div>

        )
    }
}

export default AdRegister;
