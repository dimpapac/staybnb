import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { withRouter } from 'react-router'

import AutoCompleteLoc from './AutoCompleteLoc'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class SearchBar extends Component {

    constructor (props) {
        super()
        this.state = {
            show: false,
            setShow: false,
            startDate: new Date(),
            location: " "
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleLocation = this.handleLocation.bind(this);


    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }


    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    handleLocation =  (val) => {
        if (val.length > 0) 
            this.setState({
                location: val,
                locError: false
            })
        else
            this.setState({
                location: val,
                locError: true
            })
    };

    render() { 
        return (
            <React.Fragment>
                <button onClick={() => this.handleSearchButton("/apartments")} >Search</button>
                <form>
                    <div className="form-row">
                        <AutoCompleteLoc value={this.state.location} handleLocation={this.handleLocation} name="location"/>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </form>
                
            </React.Fragment>
        )
    }
}

export default withRouter(SearchBar);