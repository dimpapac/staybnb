
import React, {Component} from 'react'
import SearchBar from './SearchBar';
import { withRouter } from 'react-router'

import { Switch, Route , Redirect} from 'react-router-dom'

class Bookings extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {

        };
    }

    render() {
      return (
        <div>
        </div>
      );
    }
}

export default withRouter(Bookings);
