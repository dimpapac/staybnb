import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/navbar.css';


class NavBar extends Component {

    constructor (props) {
        super()
        this.state = {
        }
    } 


    render() { 
        return (
            <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light " >
                <a className="navbar-brand " href="#"> <img className="logo_img"
                    src={logo}
                    alt=''
                />
                </a>
 

                <div className="collapse navbar-collapse  ml-auto"  id="navbarSupportedContent" >
                    <ul className="navbar-nav ml-auto " >
                    <button className="hostbutton" >Become a Host</button>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle "  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <i class="fa fa-bars"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" style={{ marginTop : 10}} aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </li>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
        )
    }
}

export default NavBar