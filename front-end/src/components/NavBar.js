import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/navbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { authenticationService } from '../services/authentication.service';



class NavBar extends Component {

    constructor (props) {
        super()
        this.state = {
            show: false,
            setShow: false,
            flag: true,
            username: "",
            password: ""
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
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

    handleTextArea = event => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
        event.preventDefault();
    }

    handleLogin = (event) => {
        // console.log('Submitting...', u, p)

        authenticationService.login(this.state.username, this.state.password)
            .then(
                user => {
                    console.log(user)
                    this.setState({flag: true})
                    localStorage.setItem('user', user);
                    this.handleClose()
                },
                error => {
                    console.log("wrong input")
                    this.setState({flag: false});
                    
                }
            );

        event.preventDefault();
    };


    render() { 
        return (
            <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light " >
                <a className="navbar-brand " href="/"> <img className="logo_img"
                    src={logo}
                    alt=''
                />
                </a>
 

                <div className="collapse navbar-collapse  ml-auto"  id="navbarSupportedContent" >
                    <ul className="navbar-nav ml-auto " >
                    <button className="hostbutton" >Become a Host</button>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle "  href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <i className="fa fa-bars"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" style={{ marginTop : 10}} aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">Εγγραφή</a>
                        <button className="dropdown-item" onClick={this.handleShow}>Σύνδεση</button>
                        <Modal show={this.state.setShow} onHide={this.handleClose}>
                            <Modal.Header className= "text-center" closeButton>
                              <Modal.Title className= "w-100">Σύνδεση</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.handleLogin}>
                                  <div className="form-group">
                                    <label for="username" className="">Όνομα Χρήστη</label>
                                    <div className="">
                                      <input type="text" className="form-control" value={this.state.username} onChange={this.handleTextArea} name="username"  placeholder="Username"/>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                    <label for="inputPassword" className="">Κωδικός Χρήστη</label>
                                    <div className="">
                                      <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={this.handleTextArea} name="password" placeholder="Password"/>
                                    </div>
                                  </div>
                                  <button className="btn btn-primary w-100" type="submit" >
                                    Σύνδεση
                                  </button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <p>Δεν έχετε λογαριασμό;</p>
                              <button type="button" className="btn btn-link p-0 m-0">Εγγραφή</button>
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