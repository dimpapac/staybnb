import React, {Component , useState} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import AutoCompleteLoc from './AutoCompleteLoc'

import { adService } from '../services/ad.service'
import GMap from './Gmap'






class AdRegister extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            lat: null,
            lng: null,
            title : null,
            type :null,
            price : null,
            capacity : null,
            address : null,
            location : null ,
            photos : null,
            description : null,
            locationInfo : null,
            elevator : false,
            parking : false,
            tv : false ,
            kitchen : false,
            heat : false,
            airco : false,
            wifi : false

        } 

        this.locationHandler = this.locationHandler.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckBox =this.handleCheckBox.bind(this);
    } 

    handleShow(){
        this.setState({ 
            setShow: true
        });
    };

    handleClose(){
        this.setState({ 
            setShow: false
        });
    };

    fileSelectHandler = event => {
        this.setState ({
            photos : event.target.files
        })
    }

    handleTextArea = event => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
        event.preventDefault();
    }

    handleCheckBox = event => {
        const {name,value} = event.target;
        const newVal = !this.state.[name]
        this.setState({
            [name] : newVal
        })
    }

    handleSubmit() {
        const message = adService.add_ad(this.state);
        alert (message)
    }

    handleLocation =  (val) => {
        if (val.length > 0) 
            this.setState({
                location: val,
                locError: false
            })
        else
            this.setState({
                location: val,
                locError: true
            })
    };

    locationHandler(lat,lng) {
        this.setState({
            lat: lat,
            lng: lng
        });
    }

    render() { 
        return (
            <div >
                <form  className =" col"  onSubmit={this.handleRegister} style={{width:"50%",marginLeft:"25%",marginTop:"2pc"}}>
                    <div className="form-group">
                    <label htmlFor="title">Τίτλος</label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTextArea} name="title"  placeholder="Τίτλος Αγγελίας"/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="type">Τύπος Ενοικιαζόμενου Χώρου</label>
                        <select className="form-control" value={this.state.type} onChange={this.handleTextArea} name="type" >
                        <option>Δωμάτιο</option>
                        <option>Διαμέρισμα</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label htmlFor="title">Τιμή Ανά Βράδυ</label>
                        <input type="text" className="form-control" value={this.state.price} onChange={this.handleTextArea} name="price"  placeholder="π.χ. 35"/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="capacity">Μέγιστος Αριθμός Ατόμων</label>
                        <input type="text" className="form-control" value={this.state.capacity} onChange={this.handleTextArea} name="capacity"  placeholder="π.χ. 2"/>
                    </div>


                    <div className="row">
                        <div className="col-3">
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="wifi" />
                                <label className="form-check-label" htmlFor="wifi">Wifi</label>
                            </div>

                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="airco" />
                                <label className="form-check-label" htmlFor="airco">Ψύξη</label>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="heat" />
                                <label className="form-check-label" htmlFor="heat">Θέρμανση</label>
                            </div> 
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="kitchen" />
                                <label className="form-check-label" htmlFor="kitchen">Κουζίνα</label>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="tv" />
                                <label className="form-check-label" htmlFor="tv">Τηλεόραση</label>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="parking" />
                                <label className="form-check-label" htmlFor="parking">Parking</label>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group form-check"> 
                                <input type="checkbox" className="form-check-input" onClick={this.handleCheckBox} name="elevator" />
                                <label className="form-check-label"  htmlFor="elevator">Ανελκυστήρας</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                    <label htmlFor="address">Διεύθυνση</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.handleTextArea} name="address"  placeholder="Διεύθυνση Χώρου"/>
                    </div>

                    <div>
                        <div className="form-group">
                            <label htmlFor="area">Πόλη</label>
                            <AutoCompleteLoc  className="form-control" value={this.state.location} handleLocation={this.handleLocation} name="location" required/>
                        </div>
                    </div>

                    <button  type="button" className="btn btn-primary" style={{marginLeft:"30%",width:"40%",marginTop:"10px"}} onClick={this.handleShow}>Άνοιγμα Χάρτη</button>
                    <Modal size="lg" show={this.state.setShow} onHide={this.handleClose} >
                            <Modal.Header  closeButton >
                            </Modal.Header>
                            <Modal.Body>
                            <div className="text-center" style={{width : "100%"}}>
                                <GMap className="text-center" action={this.locationHandler} withMarkers={false} ads = {[this.state.info]} height={"80vh"} width={"100%"} marginTop={"0px"}/>
                            </div>
                            </Modal.Body>
                    </Modal>
                    {this.state.lat == null ? 
                    (<div className="text-center" style={{ color:"white",borderRadius:"10px",width:"100%",background:"#FA8072",marginTop:"2pc",height:"2pc",marginBottom:"2px"}}>Παρακαλούμε επιλέξτε το σημείο στον Χάρτη</div>) 
                    :
                    (<div className="text-center" style={{ color:"white",borderRadius:"10",width:"100%",background:"#6B8E23",marginTop:"2pc",height:"2pc",marginBottom:"2px"}}>Το σημείο επιλέχτηκε! </div>)
                    }
                    <p>Αν επιλέξατε λάθος σημείο, απλά επιλέξτε ξανά!</p>
                    
                    <div className="form-group">
                    <label htmlFor="description">Περιγραφή</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.handleTextArea} name="description"  placeholder="Περιγραφή Χώρου"/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="locationInfo">Πληροφορίες Τοποθεσίας</label>
                        <input type="text" className="form-control" value={this.state.locationInfo} onChange={this.handleTextArea} name="locationInfo"  placeholder="Πληροφορίες Τοποθεσίας"/>
                    </div>


                    <div className="form-group">
                    <label htmlFor="photos"> Φωτογραφίες</label>
                        <input className="row" type="file" onChange={this.fileSelectHandler} multiple/>
                    </div>
                    
                    <button style={{marginLeft:"30%",width:"40%",marginTop:"10px",marginBottom:"4pc"}} className="btn btn-primary " type="submit" onClick={this.handleSubmit} >
                    Εγγραφή
                    </button>
                </form>
            </div>

        )
    }
}

export default AdRegister;
