
import React, {Component} from 'react'
import BookingListItem from './BookingListItem'
import { withRouter } from 'react-router'

import { Switch, Route , Redirect} from 'react-router-dom'

import { bookingService } from '../services/booking.service'

class Bookings extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {
          bookings : null,
          is_loading : true
        };
    }

    componentDidMount(){
      let user = JSON.parse(localStorage.getItem('user'));
      bookingService.get_bookings(user._id)
        .then( response => {
            this.setState({
              is_loading : false,
              bookings : response
            })
        });	
    }

    render() {
      return (
        <div>
        { !this.state.is_loading && (
        <div>
          {this.state.bookings.map((booking) => {//Loop through every row of the json file and get the attributes
							return (
								<div  class="list-group" style={{marginTop:"1%"}}>
                  <BookingListItem booking={booking}/>
								</div>
							)     			
						})}	
        </div>
        )}
        </div>
      );
    }
}

export default withRouter(Bookings);
