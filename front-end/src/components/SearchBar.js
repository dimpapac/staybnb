import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { withRouter } from 'react-router'

import AutoCompleteLoc from './AutoCompleteLoc'
import DatePicker, { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import el from 'date-fns/locale/el';
registerLocale('el', el)

class SearchBar extends Component {

    constructor (props) {
        super()
        this.state = {
            show: false,
            setShow: false,
            startDate: null,
            endDate: null,
            location: ""
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleChange = this.handleChange.bind(this);

    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }


    handleChange = dates => {
        const [start, end] = dates;
        this.setState({
            startDate: start,
            endDate: end
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
                <button onClick={() => this.handleSearchButton("/apartments")}>Search</button>
                <form>
                    <div className="form-row mx-auto">
                        <AutoCompleteLoc value={this.state.location} handleLocation={this.handleLocation} name="location" required/>
                        <DatePicker
                            placeholderText="Επιλέξτε ημερομηνίες"
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat="DD/MM/YYYY"
                            monthsShown={2}
                            minDate={new Date()}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            selectsRange
                            inline
                            isClearable
                            required
                            locale="el"
                        />

                    </div>
                </form>
                
            </React.Fragment>
        )
    }
}

export default withRouter(SearchBar);