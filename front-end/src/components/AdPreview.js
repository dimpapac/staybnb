import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import PhotoGrid from './PhotoGrid'
import Gmap from './Gmap'
import BookingButton from './BookingButton'

import { adService } from '../services/ad.service'







class AdPreview extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            loading : true,
            info : null,
            photos : null,
            flag : 1,
            reviewText : "" ,
            stars : 0

        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
    } 

    handleTextArea = event => {
        const {name,value} = event.target;
        this.setState({
            [name]: value
        })
        event.preventDefault();
    }

    componentDidMount(){
        const id = localStorage.getItem('ad')
        adService.get_ad(id)
        .then( response => {
            if ( response != null ) {
                let photos = response.photos.map(a => "https://localhost:9000/staybnb/api/ads/uploads?fileName=" + a )
                this.setState((prevState,props) => ({
                    info : response,
                    loading: false,
                    photos : photos
                }))
            }
        })

        if ( this.props.location.state != null ){
            this.setState({
                flag : this.props.location.state.flag
            })
        }  
    }


    handleReviewSubmit(){
        const id = JSON.parse(localStorage.getItem('user'))._id
        const username = JSON.parse(localStorage.getItem('user')).username
        adService.add_review(this.state.reviewText,this.state.stars,this.state.info._id,id,username)
        this.handleClose()
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

    render() { 

        return (
            <div>
            { !this.state.loading && (
                <div class="container">
                    <h1 class="row" >{this.state.info.title}</h1>

                    <PhotoGrid class="row" info ={this.state.info} photos = { this.state.photos } />

                    <div class="row" style={{marginTop:"5pc"}}>
                        
                        <div class="col-9" style={{height:"50vh"}}>
                            {this.state.info.filters.wifi == "true" && (<span class=" badge badge-primary" style={{marginLeft:"1%",marginTop:"2%",fontSize:"15px"}}>Wifi</span>)}
                            {this.state.info.filters.airco == "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Κλιματισμός</span>)}
                            {this.state.info.filters.heat == "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Θέρμανση</span>)}
                            {this.state.info.filters.kitchen == "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Κουζίνα</span>)}
                            {this.state.info.filters.parking == "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Χώρος Στάθμευσης</span>)}
                            {this.state.info.filters.elevator == "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Ανελκυστήρας</span>)}
                            {this.state.info.filters.tv == "true"  && (<span class=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Τηλεόραση</span>)}
                            <h2 class="row" style={{marginTop:"10px"}} >Διεύθυνση</h2>
                            <p >{this.state.info.location.address}  {this.state.info.location.area}</p>



                            <h2 class="row" style={{marginTop:"10px"}}> Περιγραφή Διαμερίσματος</h2>
                            <p >{this.state.info.description} </p>


                        </div>
                        { localStorage.getItem('user') != null && this.state.flag != 0 && (
                            <div class="col-3" style={{height:"50vh",borderStyle:"solid",borderWidth:"1px", borderRadius:"25px",borderColor:"lightgrey"}}>
                                <BookingButton ad={this.state.info}/>
                            </div>
                        )}

                    
                    </div>

                    { this.state.flag == 0 && (
                            <div>
                                <button  type="button" className="btn btn-primary" style={{marginTop:"10px",width:"100%"}} onClick={this.handleShow}>Προσθήκη Κριτικής</button>
                                <Modal size="lg" show={this.state.setShow} onHide={this.handleClose} >
                                    <Modal.Header  closeButton >
                                    </Modal.Header>

                                    <div className="form-group" style={{width:"40%",marginLeft:"30%"}}>
                                        <label htmlFor="title">Κείμενο</label>
                                        <input type="text" className="form-control" value={this.state.reviewText} onChange={this.handleTextArea} name="reviewText"  />
                                    </div>

                                    <div className="form-group" style={{width:"40%",marginLeft:"30%"}}>
                                            <label htmlFor="capacity">Αστέρια</label>
                                            <input type="text" className="form-control" value={this.state.stars} onChange={this.handleTextArea} name="stars"  placeholder="1-5"/>
                                    </div>


                                    <button  type="button" className="btn btn-primary" style={{marginLeft:"40%",marginTop:"10px",width:"20%"}} onClick={this.handleReviewSubmit}>Προσθήκη</button>


                                    <Modal.Body>
                                    </Modal.Body>
                                </Modal>
                            </div>
                    )}

                    <h2 style={{marginTop:"10px"}}>Πληροφορίες Τοποθεσίας</h2>
                    <p >{this.state.info.locationInfo}</p>
					<Gmap withMarkers={true}ads = {[this.state.info]} height={"40vh"} width={"100%"} marginTop={"10px"}/>
 
                </div>
            )}
            </div>

        )
    }
}

export default AdPreview;
