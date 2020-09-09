import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/navbar.css';
import Modal from 'react-bootstrap/Modal'
import { authenticationService } from '../services/authentication.service';



class NavBar extends Component {

    constructor (props) {
        super()
        this.state = {
            show: false,
            showReg: false,
            setShow: false,
            setShowReg: false,
            flag: true,
            flagReg: true,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            newusername: "",
            password1: "",
            password2: ""
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseReg = this.handleCloseReg.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleShowReg = this.handleShowReg.bind(this)
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

    handleCloseReg(){
        this.setState({ 
            setShowReg: false
        });
    };

    handleShowReg(){
        this.setState({ 
            setShowReg: true
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

    handleRegister = (event) => {
        // console.log('Submitting...', u, p)

        // console.log(this.state.name)
        // console.log(this.state.surname)
        // console.log(this.state.email)


        if (this.state.password1 !== this.state.password2) {
            this.setState({
                flagReg: false
            })
        }
        else {
            // console.log(this.state.firstName, this.state.lastName)
            authenticationService.registerUser(this.state.newusername, this.state.password1, this.state.email, this.state.firstName, this.state.lastName)
                .then(
                    text => {
                        console.log(text)
                        this.setState({flagReg: true})
                        this.handleCloseReg()
                    },
                    error => {
                        console.log("wrong input")
                        this.setState({flagReg: false});
                        
                    }
            );
        }

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
                        <a className="nav-link dropdown-toggle " href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <i className="fa fa-bars"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" style={{ marginTop : 10}} aria-labelledby="navbarDropdown">
                        <button className="dropdown-item" onClick={this.handleShowReg}>Εγγραφή</button>

                        <Modal show={this.state.setShowReg} onHide={this.handleCloseReg}>
                            <Modal.Header className= "text-center" closeButton>
                              <Modal.Title className= "w-100">Εγγραφή</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.handleRegister}>
                                  <div className="form-group">
                                    <label for="username">Όνομα</label>
                                      <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleTextArea} name="firstName"  placeholder="Ιωάννης"/>
                                  </div>
                                  <div className="form-group">
                                    <label for="username">Επώνυμο </label>
                                      <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleTextArea} name="lastName"  placeholder="Σκούρας"/>
                                  </div>
                                  <div className="form-group">
                                    <label for="username">Email*</label>
                                      <input type="email" className="form-control" id="exampleInputEmail1" value={this.state.email} onChange={this.handleTextArea} name="email" placeholder="Enter email"  required/>
                                  </div>
                                  <div className="form-group">
                                    <label for="username">Όνομα Χρήστη*</label>
                                      <input type="text" className="form-control" value={this.state.newusername} onChange={this.handleTextArea} name="newusername"  placeholder="Username" required/>
                                  </div>
                                  <div className="form-group">
                                    <label for="inputPassword">Κωδικός Χρήστη*</label>
                                      <input type="password" className="form-control" id="inputPassword" value={this.state.password1} onChange={this.handleTextArea} name="password1" placeholder="Password" required/>
                                  </div>
                                  <div className="form-group">
                                    <label for="inputPassword">Κωδικός Χρήστη (Επιβεβαίωση)*</label>
                                      <input type="password" className="form-control" id="inputPassword" value={this.state.password2} onChange={this.handleTextArea} name="password2" placeholder="Confirm Password" required/>
                                  </div>
                                  <button className="btn btn-primary w-100" type="submit" >
                                    Εγγραφή
                                  </button>
                                    {!this.state.flagReg &&
                                        <div className="mt-2 alert alert-danger">
                                            <strong>Διαφορετικοί κωδικοί Χρήστη</strong>
                                        </div>
                                    }
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <p>Έχετε λογαριασμό;</p>
                              <button type="button" className="btn btn-link p-0 m-0" onClick={() => {this.handleCloseReg() ; this.handleShow();}}>Σύνδεση</button>
                            </Modal.Footer>
                        </Modal>

                        <button className="dropdown-item" onClick={this.handleShow}>Σύνδεση</button>
                        <Modal show={this.state.setShow} onHide={this.handleClose}>
                            <Modal.Header className= "text-center" closeButton>
                              <Modal.Title className= "w-100">Σύνδεση</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form onSubmit={this.handleLogin}>
                                  <div className="form-group">
                                    <label for="username">Όνομα Χρήστη</label>
                                      <input type="text" className="form-control" value={this.state.username} onChange={this.handleTextArea} name="username"  placeholder="Username"/>
                                  </div>
                                  <div className="form-group">
                                    <label for="inputPassword">Κωδικός Χρήστη</label>
                                      <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={this.handleTextArea} name="password" placeholder="Password"/>
                                  </div>
                                  <button className="btn btn-primary w-100" type="submit" >
                                    Σύνδεση
                                  </button>
                                    {!this.state.flag &&
                                        <div className="mt-2 alert alert-danger">
                                            <strong>To Όνομα Χρήστη ή ο Κωδικός Πρόσβασης είναι λάθος</strong>
                                        </div>
                                    }
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <p>Δεν έχετε λογαριασμό;</p>
                              <button type="button" className="btn btn-link p-0 m-0" onClick={() => {this.handleClose() ; this.handleShowReg();}} >Εγγραφή</button>
                            </Modal.Footer>
                        </Modal>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/help">Βοήθεια</a>
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