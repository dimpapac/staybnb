import React, {Component} from 'react'
import { withRouter } from 'react-router'
import { bookingService } from '../services/booking.service'
import BookingListItem from './BookingListItem'

class Requests extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {
            is_loading : true,
            requests : null
        };
    }


    componentDidMount(){
        let user = JSON.parse(localStorage.getItem('user'));
        bookingService.get_requests(user._id)
          .then( response => {
              this.setState({
                is_loading : false,
                requests : response
              })
          });	
      }
  
      render() {
        return (
          <div>
          { !this.state.is_loading && (
          <div>
            {this.state.requests.map((request) => {//Loop through every row of the json file and get the attributes
                return (
                    <div  class="list-group" style={{marginTop:"1%"}}>
                    <BookingListItem requestInfo={request} flag={2} booking={request}/>
                    </div>
                )     			
            })}	
          </div>
          )}
          </div>
        );
      }


}

export default withRouter(Requests);
