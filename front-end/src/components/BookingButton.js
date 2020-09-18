import React, {Component , useState} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { DateRange } from 'react-date-range';
import 'react-dates/initialize';

import { DateRangePicker } from 'react-dates';
import { adService } from '../services/ad.service'

import 'react-dates/lib/css/_datepicker.css';






class BookingButton extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            ad : props.ad,
            startDate : null,
            endDate : null
        } 
        this.handleClick = this.handleClick.bind(this);
    } 

    handleClick(){
        alert(this.state.startDate);
    };




    render() { 

        return (
            <div >
                <h4>{this.state.ad.price}$ /το βράδυ</h4>
                <p>4/5</p>

                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />

                <button  type="button" class="btn btn-primary  " style={{width:"100%",marginTop:"10px"}} onClick={this.handleClick}>Κράτηση</button>
            </div>

        )
    }
}

export default BookingButton;
