import React, {Component} from 'react'
import SearchBar from './SearchBar';
import { withRouter } from 'react-router'

import { Switch, Route , Redirect} from 'react-router-dom'

class NavBarMenu extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {
            userType: this.props.userType
        };
    }

    componentWillReceiveProps({userType}) {
      this.setState({...this.state,userType})
    }

    render() {
        return (
            <div>
                {(this.state.userType === 1) && 
                    <React.Fragment>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{marginLeft: "120px"}}>
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="/">Αναζήτηση</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/bookings">Οι κρατήσεις μου</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#">Μηνύματα</a>
                        </li>
                      </ul>
                    </div>
                    </React.Fragment>
                }
                {(this.state.userType === 2) && 
                    <React.Fragment>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{marginLeft: "120px"}}>
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a className="nav-link" href="/">Διαχείριση</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="/help">Αιτήματα</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#"></a>
                        </li>
                      </ul>
                    </div>
                    </React.Fragment>
                }
            </div>
        );
    }
}

export default withRouter(NavBarMenu);
