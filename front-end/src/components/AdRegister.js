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
            lng: null
        } 

        this.locationHandler = this.locationHandler.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
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
                <form  class ="float-left"  onSubmit={this.handleRegister} style={{width:"40%",marginLeft:"2%",marginTop:"2pc"}}>
                    <div className="form-group">
                    <label for="title">Τίτλος</label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTextArea} name="title"  placeholder="Τίτλος Αγγελίας"/>
                    </div>
                    <div class="form-group">
                        <label for="type">Τύπος Ενοικιαζόμενου Χώρου</label>
                        <select class="form-control" value={this.state.type} onChange={this.handleTextArea} name="type" >
                        <option>Δωμάτιο</option>
                        <option>Διαμέρισμα</option>
                        </select>
                    </div>
                    <div className="form-group">
                    <label for="address">Διεύθυνση</label>
                        <input type="text" className="form-control" value={this.state.address} onChange={this.handleTextArea} name="address"  placeholder="Διεύθυνση Χώρου"/>
                    </div>

                    <div className="form-group">
                    <label for="title">Τιμή Ανά Βράδυ</label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.handleTextArea} name="price"  placeholder="π.χ. 35"/>
                    </div>

                    <div>
                        <div className="form-group">
                            <label for="area">Πόλη</label>
                            <AutoCompleteLoc  class="float-left" value={this.state.location} handleLocation={this.handleLocation} name="location" required/>
                        </div>
                    </div>
                    
                    {this.state.lat == null ? 
                    (<div class="text-center" style={{ color:"white",borderRadius:"10px",width:"50%",background:"#FA8072",marginTop:"2pc",height:"2pc",marginBottom:"2px"}}>Παρακαλούμε επιλέξτε το σημείο στον Χάρτη</div>) 
                    :
                    (<div class="text-center" style={{ color:"white",borderRadius:"10",width:"50%",background:"#6B8E23",marginTop:"2pc",height:"2pc",marginBottom:"2px"}}>Το σημείο επιλέχτηκε! </div>)
                    }
                    <p>Αν επιλέξατε λάθος σημείο, απλά επιλέξτε ξανά!</p>

                    
                    
                    <button className="btn btn-primary w-100" type="submit" >
                    Εγγραφή
                    </button>
                </form>

                <GMap class="float-right" action={this.locationHandler} withMarkers={false} ads = {[this.state.info]} height={"80vh"} width={"50%"} marginTop={"10px"}/>
            </div>

        )
    }
}

export default AdRegister;
