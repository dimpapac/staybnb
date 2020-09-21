import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { withRouter } from 'react-router'

import AutoCompleteLoc from './AutoCompleteLoc'
import DatePicker, { registerLocale } from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { DateRangePicker } from 'react-dates';



class SearchBar extends Component {

    constructor (props) {
        super()
        this.state = {
            startDate: null,
            endDate: null,
            location: "",
            visitors: 1
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleVisitors = this.handleVisitors.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);

    }

    handleSearchButton(item) {
        this.props.history.push({
            pathname: item,
            state: {
                startDate: this.state.startDate.format("DD-MM-YYYY"),
                endDate: this.state.endDate.format("DD-MM-YYYY"),
                location: this.state.location,
                visitors: this.state.visitors
            }
        });
    }

    handleVisitors(event) {
        this.setState({visitors: Number(event.target.value)});
    }

    handleLocation = (val) => {
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
    }

    handleMinus() {
        this.state.visitors > 1 && this.setState({
            visitors : this.state.visitors - 1
        })
    }

    handlePlus() {
        this.setState({
            visitors : this.state.visitors + 1
        })
    }

    render() { 
        return (
            <React.Fragment>
                <div className="row m-0">
                    <div className="col-2 p-0"/>
                    <div className="col-8 border-bottom mt-2 p-0">
                        <form className="form-inline">
                            <div className="form-group mb-2">
                                <AutoCompleteLoc value={this.state.location} handleLocation={this.handleLocation} name="location" required/>
                            </div>
                            <div className="form-group mx-sm-3 mb-2">
                                <DateRangePicker
                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                    endDateId="y     our_unique_end_date_id" // PropTypes.string.isRequired,
                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                />
                            </div>
                            <div className="form-group mx-sm-3 mb-2 input-group">
                                <div className="input-group-prepend">
                                    <span style={{height:'47.5px', borderRadius: '2px'}} className="btn input-group-text" onClick={this.handleMinus}>-</span>
                                </div>
                                <input type="number" style={{width: '40px', height:'47.5px'}} value={this.state.visitors} name="quantity" className="form-control" onChange={this.handleVisitors}/>
                                <div className="input-group-append">
                                    <span style={{height:'47.5px', borderRadius: '2px'}} className="btn input-group-text" onClick={this.handlePlus}>+</span>
                                </div>
                            </div>
                            <button style={{height:'47.5px'}} type="submit" className="btn btn-info mb-2" onClick={() => this.handleSearchButton("/ads")}>Search</button>
                        </form>
                    </div>
                    <div className="col-2 p-0"/>

                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchBar);