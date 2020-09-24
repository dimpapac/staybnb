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
       adService.add_booking(this.state.ad.hostId, JSON.parse(localStorage.getItem('user'))._id,this.state.ad._id,this.state.startDate,this.state.endDate)
    };




    render() { 
        const date1 = new Date(this.state.startDate);
        const date2 = new Date(this.state.endDate);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        return (
            <div >
                <h4 style={{marginTop:"5%"}}>{this.state.ad.price}$ /το βράδυ</h4>

                <DateRangePicker style={{marginTop:"5%"}}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />

                <button type="button" class="btn btn-primary  " style={{width:"100%",marginTop:"5%"}} onClick={this.handleClick}>Κράτηση</button>

                <h4 style={{marginTop:"5%",color:"grey"}}>{diffDays} x {this.state.ad.price} = {diffDays * this.state.ad.price}</h4>
            </div>

        )
    }
}

export default BookingButton;
