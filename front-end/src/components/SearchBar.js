import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { withRouter } from 'react-router'


class SearchBar extends Component {

    constructor (props) {
        super()
        this.state = {
            show: false,
            setShow: false
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);

    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }


    render() { 
        return (
            <React.Fragment>
                <button onClick={() => this.handleSearchButton("/apartments")} >Search</button>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchBar);