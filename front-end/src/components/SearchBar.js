import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
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
            city: "",
            country: "",
            visitors: 1
        }

        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleVisitors = this.handleVisitors.bind(this);
        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);

    }

    handleSearchButton(item) {
        this.state.startDate && this.state.location && this.props.history.push({
            pathname: item,
            state: {
                startDate: this.state.startDate._d,
                endDate: this.state.endDate._d,
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

    handleTextArea = event => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
        event.preventDefault();
    };

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
                    <div className="col-1 p-0"/>
                    <div className="col-10 border-bottom mt-2 p-0">
                        <form className="form-inline">

                            <div className="form-group mb-2">
                                {/*<AutoCompleteLoc value={this.state.location} handleLocation={this.handleLocation} name="location" required/>*/}
                                <input style={{height:'47.5px', borderRadius: '1px'}} className="form-control input-group-text m-2" value={this.state.location} onChange={this.handleTextArea} name="location" placeholder="Συνοικία" required/>
                            </div>
                            <div className="form-group mb-2">
                                <input style={{height:'47.5px', borderRadius: '1px'}} className="form-control input-group-text m-2" value={this.state.city} onChange={this.handleTextArea} name="city" placeholder="Πόλη" required/>
                            </div>
                            <div className="form-group mb-2">
                                <input style={{height:'47.5px', borderRadius: '2px'}} className="form-control input-group-text m-2" value={this.state.country} onChange={this.handleTextArea} name="country" placeholder="Χώρα" required/>
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
                    <div className="col-1 p-0"/>

                </div>
            </React.Fragment>
        )
    }
}

export default withRouter(SearchBar);