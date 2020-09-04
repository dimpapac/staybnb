import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/navbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'


class NavBar extends Component {

    constructor (props) {
        super()
        this.state = {
            show: false,
            setShow: false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
    } 

    handleClose(){
        this.setState({ 
            setShow: false
        });
    };

    handleShow(){
        this.setState({ 
            setShow: true
        });
    };

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
                        <a className="dropdown-item" href="#">Εγγραφή</a>
                        <a className="dropdown-item" onClick={this.handleShow}>Σύνδεση</a>
                        <Modal show={this.state.setShow} onHide={this.handleClose}>
                            <Modal.Header className= "text-center" closeButton>
                              <Modal.Title className= "w-100">Σύνδεση</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Woohoo, you're reading this text in a modal!
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={this.handleClose}>
                                Close
                              </Button>
                              <Button variant="primary" onClick={this.handleClose}>
                                Save Changes
                              </Button>
                            </Modal.Footer>
                        </Modal>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Βοήθεια</a>
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