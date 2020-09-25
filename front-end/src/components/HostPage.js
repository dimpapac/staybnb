import React, {Component} from 'react'
import { withRouter } from 'react-router'
import SearchBar from './SearchBar';



class HostPage extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {

        };
        let user = JSON.parse(localStorage.getItem("user"))
        if ((user && user.userType!==2) || !user) {
            this.props.history.push('/')
        }
    }

    render() {
      return (
        <div>
          <button style={{height:'47.5px'}} type="submit" className="btn btn-primary mb-2" onClick={() => this.props.history.push("/newAd")}>Προσθήκη καταλύματος</button>
          <SearchBar/>
        </div>
      );
    }
}

export default withRouter(HostPage);
