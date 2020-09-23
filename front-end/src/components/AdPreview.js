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
            photos : null
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
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
                        { localStorage.getItem('user') != null && (
                            <div class="col-3" style={{height:"50vh",borderStyle:"solid",borderWidth:"1px", borderRadius:"25px",borderColor:"lightgrey"}}>
                                <BookingButton ad={this.state.info}/>
                            </div>
                        )}
                    </div>

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
