import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/navbar.css';
import Modal from 'react-bootstrap/Modal'
import { authenticationService } from '../services/authentication.service';

import NavBarMenu from './NavBarMenu';


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
            flagName: true,
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            newusername: "",
            password1: "",
            password2: "",
            usertype: "1"
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleCloseReg = this.handleCloseReg.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleShowReg = this.handleShowReg.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        this.doLogout = this.doLogout.bind(this)
        this.clearInput = this.clearInput.bind(this)
    } 

    clearInput()
    {
        this.setState({ 
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: "",
            newusername: "",
            password1: "",
            password2: ""
        });
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
                    this.setState({flag: true})
                    localStorage.setItem('user', JSON.stringify(user))
                    this.handleClose()
                    this.clearInput()
                    this.setState({
                        userType: user.userType,
                    })
                    this.render();
                    user.userType === 2 && this.props.history.push('/host');
                    user.userType === 0 && this.props.history.push('/admin');
                },
                error => {
                    console.log("wrong input")
                    this.setState({flag: false});
                    
                }
            );

        
        event.preventDefault();
    };

    handleRegister = (event) => {

        if (this.state.password1 !== this.state.password2) {
            this.setState({
                flagReg: false
            })
        }
        else {
            // console.log(this.state.firstName, this.state.lastName)
            authenticationService.registerUser(this.state.newusername, this.state.password1, this.state.email, this.state.firstName, this.state.lastName, parseInt(this.state.usertype))
                .then(
                    text => {
                        console.log(text)
                        this.setState({flagReg: true})
                        this.handleCloseReg()
                        this.clearInput()
                        this.handleShow()
                    },
                    error => {
                        console.log("wrong input")
                        this.setState({flagName: false});
                        
                    }
            );
        }

        event.preventDefault();
    };

    doLogout = (event) => {
        authenticationService.logout();
        this.setState({userType: 3});
        this.render()
        this.props.history.push('/');
    }

    componentDidMount(){
        let user = JSON.parse(localStorage.getItem("user"))
        if (user){
            this.setState({
                userType: user.userType
            });
        } 
        else{
            this.setState({
                userType: 3
            });
        }
    }

    render() { 

        let user = JSON.parse(localStorage.getItem("user"))
        return (
            <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light " >
                <a className="navbar-brand " href="/"> <img className="logo_img"
                    src={logo}
                    alt=''
                />
                </a>
                <NavBarMenu userType={this.state.userType}/>
                <div className="collapse navbar-collapse  ml-auto"  id="navbarSupportedContent" >
                    <ul className="navbar-nav ml-auto " >
                    {user && 
                        <a className="nav-item nav-link disabled">{user.name.firstName}</a>
                    }
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle " href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                            <i className="fa fa-bars"/>
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" style={{ marginTop : 10}} aria-labelledby="navbarDropdown">
                        
                        
                        {user 
                            ? 
                            <React.Fragment>
                            <button className="dropdown-item" onClick={()=> this.props.history.push('/profile')}>Προφίλ</button>
                            <button className="dropdown-item" onClick={this.doLogout}>Αποσύνδεση</button>
                            </React.Fragment>
                            : <React.Fragment>
                                <button className="dropdown-item" onClick={this.handleShowReg}>Εγγραφή</button>
                                <Modal show={this.state.setShowReg} onHide={this.handleCloseReg}>
                                    <Modal.Header className= "text-center" closeButton>
                                      <Modal.Title className= "w-100">Εγγραφή</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={this.handleRegister}>
                                          <div className="form-group">
                                            <label htmlFor="username">Όνομα</label>
                                              <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleTextArea} name="firstName"  placeholder="π.χ. Ιωάννης"/>
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="username">Επώνυμο </label>
                                              <input type="text" className="form-control" value={this.state.lastName} onChange={this.handleTextArea} name="lastName"  placeholder="π.χ. Σκούρας"/>
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="username">Email*</label>
                                              <input type="email" className="form-control" value={this.state.email} onChange={this.handleTextArea} name="email" placeholder="π.χ. email@gmail.com"  required/>
                                          </div>
                                          <label htmlFor="usertype">Τύπος Χρήστη</label>
                                            <select className="form-control" value={this.state.usertype} onChange={this.handleTextArea} name="usertype" >
                                            <option value="1">Επισκέπτης</option>
                                            <option value="2">Οικοδεσπότης</option>
                                            </select>
                                          <div className="form-group">
                                            <label htmlFor="username">Όνομα Χρήστη*</label>
                                              <input type="text" className="form-control" value={this.state.newusername} onChange={this.handleTextArea} name="newusername"  placeholder="Username" required/>
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="inputPassword">Κωδικός Χρήστη*</label>
                                              <input type="password" className="form-control" value={this.state.password1} onChange={this.handleTextArea} name="password1" placeholder="Password" required/>
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="inputPassword">Κωδικός Χρήστη (Επιβεβαίωση)*</label>
                                              <input type="password" className="form-control" value={this.state.password2} onChange={this.handleTextArea} name="password2" placeholder="Confirm Password" required/>
                                          </div>
                                          <button className="btn btn-primary w-100" type="submit" >
                                            Εγγραφή
                                          </button>
                                            {!this.state.flagReg &&
                                                <div className="mt-2 alert alert-danger">
                                                    <strong>Διαφορετικοί κωδικοί Χρήστη.</strong>
                                                </div>
                                            }
                                            {!this.state.flagName &&
                                                <div className="mt-2 alert alert-danger">
                                                    <strong>Το όνομα χρήστη υπάρχει ήδη.</strong>
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
                                            <label htmlFor="username">Όνομα Χρήστη</label>
                                              <input type="text" className="form-control" value={this.state.username} onChange={this.handleTextArea} name="username"  placeholder="Username"/>
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="inputPassword">Κωδικός Χρήστη</label>
                                              <input type="password" className="form-control" id="inputPassword" value={this.state.password} onChange={this.handleTextArea} name="password" placeholder="Password"/>
                                          </div>
                                          <button className="btn btn-primary w-100" type="submit" >
                                            Σύνδεση
                                          </button>
                                            {!this.state.flag &&
                                                <div className="mt-2 alert alert-danger">
                                                    <strong>To Όνομα Χρήστη ή ο Κωδικός Χρήστη είναι λάθος</strong>
                                                </div>
                                            }
                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <p>Δεν έχετε λογαριασμό;</p>
                                      <button type="button" className="btn btn-link p-0 m-0" onClick={() => {this.handleClose() ; this.handleShowReg();}} >Εγγραφή</button>
                                    </Modal.Footer>
                                </Modal>
                            </React.Fragment>
                        }
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