import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'


class ApartmentList extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);

    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }


    render() { 
        return (
            <div>
                <h1>BRAVO</h1>
            </div>
        )
    }
}

export default ApartmentList