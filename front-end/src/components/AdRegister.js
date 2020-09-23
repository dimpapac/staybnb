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
            locationInfo : null

        } 

        this.locationHandler = this.locationHandler.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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

    handleSubmit() {
        adService.add_ad(this.state);
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
                <form  class =" col"  onSubmit={this.handleRegister} style={{width:"50%",marginLeft:"25%",marginTop:"2pc"}}>
                    <div className="form-group">
                    <label for="title">Τίτλος</label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTextArea} name="title"  placeholder="Τίτλος Αγγελίας"/>
                    </div>
                    <div class="form-group ">
                        <label for="type">Τύπος Ενοικιαζόμενου Χώρου</label>
                        <select class="form-control" value={this.state.type} onChange={this.handleTextArea} name="type" >
                        <option>Δωμάτιο</option>
                        <option>Διαμέρισμα</option>
                        </select>
                    </div>

                    <div className="form-group">
                    <label for="title">Τιμή Ανά Βράδυ</label>
                        <input type="text" className="form-control" value={this.state.price} onChange={this.handleTextArea} name="price"  placeholder="π.χ. 35"/>
                    </div>

                    <div className="form-group">
                    <label for="capacity">Μέγιστος Αριθμός Ατόμων</label>
                        <input type="text" className="form-control" value={this.state.capacity} onChange={this.handleTextArea} name="capacity"  placeholder="π.χ. 2"/>
                    </div>


                    <div className="form-group">
                    <label for="address">Διεύθυνση</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.handleTextArea} name="address"  placeholder="Διεύθυνση Χώρου"/>
                    </div>

                    <div>
                        <div className="form-group">
                            <label for="area">Πόλη</label>
                            <AutoCompleteLoc  className="form-control" value={this.state.location} handleLocation={this.handleLocation} name="location" required/>
                        </div>
                    </div>

                    <button  type="button" class="btn btn-primary" style={{marginLeft:"30%",width:"40%",marginTop:"10px"}} onClick={this.handleShow}>Άνοιγμα Χάρτη</button>
                    <Modal size="lg" show={this.state.setShow} onHide={this.handleClose} >
                            <Modal.Header  closeButton >
                            </Modal.Header>
                            <Modal.Body>
                            <div class="text-center" style={{width : "100%"}}>
                                <GMap class="text-center" action={this.locationHandler} withMarkers={false} ads = {[this.state.info]} height={"80vh"} width={"100%"} marginTop={"0px"}/>
                            </div>
                            </Modal.Body>
                    </Modal>
                    {this.state.lat == null ? 
                    (<div class="text-center" style={{ color:"white",borderRadius:"10px",width:"100%",background:"#FA8072",marginTop:"2pc",height:"2pc",marginBottom:"2px"}}>Παρακαλούμε επιλέξτε το σημείο στον Χάρτη</div>) 
                    :
                    (<div class="text-center" style={{ color:"white",borderRadius:"10",width:"100%",background:"#6B8E23",marginTop:"2pc",height:"2pc",marginBottom:"2px"}}>Το σημείο επιλέχτηκε! </div>)
                    }
                    <p>Αν επιλέξατε λάθος σημείο, απλά επιλέξτε ξανά!</p>
                    
                    <div className="form-group">
                    <label for="description">Περιγραφή</label>
                        <input type="text" className="form-control" value={this.state.description} onChange={this.handleTextArea} name="description"  placeholder="Περιγραφή Χώρου"/>
                    </div>

                    <div className="form-group">
                    <label for="locationInfo">Πληροφορίες Τοποθεσίας</label>
                        <input type="text" className="form-control" value={this.state.locationInfo} onChange={this.handleTextArea} name="locationInfo"  placeholder="Πληροφορίες Τοποθεσίας"/>
                    </div>


                    <div className="form-group">
                    <label for="photos"> Φωτογραφίες</label>
                        <input class="row" type="file" onChange={this.fileSelectHandler} multiple/>
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
