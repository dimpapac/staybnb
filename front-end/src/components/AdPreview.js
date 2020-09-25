import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import PhotoGrid from './PhotoGrid'
import Gmap from './Gmap'
import BookingButton from './BookingButton'

import { adService } from '../services/ad.service'
import { bookingService } from '../services/booking.service'
import { messagesService } from '../services/messages.service'
import { withRouter } from 'react-router'

const dateFormat = require('dateformat');





class AdPreview extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            score : 0,
            loading : true,
            info : null,
            photos : null,
            flag : 1,
            reviewText : "" ,
            stars : 0,
            send: false,
            sendFlag: false,
            message: null,
            requestInfo : null
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.handleTextArea = this.handleTextArea.bind(this);
        this.handleSend = this.handleSend.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleReject = this.handleReject.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
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

        if (this.state.info) {
            let sum = 0
            if( this.state.info.reviews ){
                this.state.info.reviews.map(review => {
                    sum = sum + parseInt(review.stars)
                })
            }
            this.setState({
                score : sum / this.state.info.totalReviews
            })
        }

    }


    handleReviewSubmit(){
        const id = JSON.parse(localStorage.getItem('user'))._id
        const username = JSON.parse(localStorage.getItem('user')).username
        adService.add_review(this.state.reviewText,this.state.stars,this.state.info._id,id,username)
        this.handleClose()
    }

    sendMessage(event){
        event.preventDefault()
        const id = JSON.parse(localStorage.getItem('user'))._id
        const username = JSON.parse(localStorage.getItem('user')).username
        const receiver_id = this.state.info.hostId
        const host_username = this.state.info.hostName
        if (this.state.message) {
            console.log('message exists')
            messagesService.send_message(id, receiver_id, this.state.message, username, host_username)
        }
        this.setState({ 
            sendFlag: true
        });
    }

    handleSend(){
        this.setState({ 
            send: !this.state.send
        });
    }

    handleMessage(event) {
        this.setState({
            message: event.target.value
        });
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

    handleAccept(){
        const id = this.props.location.state.id
        const hostId = this.props.location.state.hostId
        const renterId = this.props.location.state.renterId
        const adId = this.props.location.state.adId
        const bookedFrom = this.props.location.state.bookedFrom
        const bookedTill = this.props.location.state.bookedTill
        const hostName = this.props.location.state.hostName
        const username = this.props.location.state.username

        bookingService.booking_remove(id)

        bookingService.booking_accept(id,hostId,renterId,adId,bookedFrom,bookedTill,hostName,username)
        this.props.history.push('requests')
    }

    handleReject(){
        const id = this.props.location.state.id
        bookingService.booking_remove(id)
        this.props.history.push('requests')
    }

    render() { 

        return (
            <div>
            { !this.state.loading && (
                <div className="container">
                    { this.state.flag ==2 && (
                            <div style={{width:"50%",marginLeft:"25%",marginTop:"20px",marginBottom:"20px",borderStyle:"solid",borderWidth:"1px", borderRadius:"25px",borderColor:"lightgrey"}}> 
                                <h5 class="text-center">Όνομα Χρήστη : {this.props.location.state.username}</h5>
                                <h5 class="text-center">Από : {dateFormat(this.props.location.state.bookedFrom, "dd-mm-yyyy")}</h5>
                                <h5 class="text-center">Μέχρι : {dateFormat(this.props.location.state.bookedTiill, "dd-mm-yyyy")}</h5>
                                <button  type="button" className=" btn btn-success" style={{marginLeft:"25%",marginTop:"10px",width:"24%",marginBottom:"10px"}} onClick={this.handleAccept}>Αποδοχή</button>
                                <button  type="button" className=" btn btn-danger" style={{marginLeft:"1%",marginTop:"10px",width:"24%",marginBottom:"10px"}} onClick={this.handleReject}>Απόρριψη</button>
                            </div>
                    )}

                    <h1 className="row" >{this.state.info.title}</h1>

                    <PhotoGrid className="row" info ={this.state.info} photos = { this.state.photos } />

                    <div className="row" style={{marginTop:"5pc"}}>
                        
                        <div className="col-9" style={{height:"50vh"}}>
                            {this.state.info.filters.wifi == "true" && (<span className=" badge badge-primary" style={{marginLeft:"1%",marginTop:"2%",fontSize:"15px"}}>Wifi</span>)}
                            {this.state.info.filters.airco == "true"  && (<span className=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Κλιματισμός</span>)}
                            {this.state.info.filters.heat == "true"  && (<span className=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Θέρμανση</span>)}
                            {this.state.info.filters.kitchen == "true"  && (<span className=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Κουζίνα</span>)}
                            {this.state.info.filters.parking == "true"  && (<span className=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Χώρος Στάθμευσης</span>)}
                            {this.state.info.filters.elevator == "true"  && (<span className=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Ανελκυστήρας</span>)}
                            {this.state.info.filters.tv == "true"  && (<span className=" badge badge-primary" style={{marginLeft:"1%",fontSize:"15px"}}>Τηλεόραση</span>)}


                            <h2 className="row" style={{marginTop:"10px"}}>Τιμή ανά βράδυ</h2>
                            <p >{this.state.info.price} </p>

                            <h2 className="row" style={{marginTop:"10px"}}>Τύπος Χώρου</h2>
                            <p >{this.state.info.type} </p>

                            <h2 className="row" style={{marginTop:"10px"}}>Μέγιστη Χωρητικότητα</h2>
                            <p >{this.state.info.capacity} </p>

                            <h2 className="row" style={{marginTop:"10px"}} >Διεύθυνση</h2>
                            <p >{this.state.info.location.address}  {this.state.info.location.area}</p>


                            <h2 className="row" style={{marginTop:"10px"}}> Περιγραφή Διαμερίσματος</h2>
                            <p >{this.state.info.description} </p>


                        </div>
                        {localStorage.getItem('user') != null && this.state.flag != 0 && this.state.flag != 2 && this.state.flag != 3 && (
                            <div className="col-3" style={{height:"50vh",borderStyle:"solid",borderWidth:"1px", borderRadius:"25px",borderColor:"lightgrey"}}>
                                <BookingButton history={this.props.history} ad={this.state.info}/>
                                {!this.state.send && <button onClick={this.handleSend} className="btn btn-info w-100">Αποστολή Μηνύματος</button>}
                                {this.state.send && 
                                    <div>
                                        <form onSubmit={this.sendMessage}>
                                            <div className="form-group">
                                                <textarea rows="4" type="text" value={this.state.message} className="form-control" onChange={this.handleMessage}/>
                                            </div>
                                            <button type="submit" className="btn btn-info w-100">Αποστολή</button>
                                        </form>
                                        <button className="btn btn-link" onClick={this.handleSend}>Άκυρο</button>
                                    </div>
                                }
                                {this.state.sendFlag && <div className="alert alert-success mt-0"role="alert">
                                  Το μήνυμα στάλθηκε
                                </div>}
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

                    { this.state.info.totalReviews > 0 && (
                        <div>
                        <h2 className="row " style={{marginTop:"10pc"}} >Αξιολογήσεις</h2>
                        <ul class=" list-group overflow-scroll" style={{height:"5pc",marginBottom:"10%"}}>
                            {this.state.info.reviews.map( review => {
                                return(
                                <li class="list-group-item">{review.text}</li>
                                )
                            })}
                        </ul>
                        </div>
                    )}
 
                </div>
            )}
            </div>

        )
    }
}

export default withRouter(AdPreview);
