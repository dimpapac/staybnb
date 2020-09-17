import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import PhotoGrid from './PhotoGrid'
import Gmap from './Gmap'

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

                    <PhotoGrid info ={this.state.info} photos = { this.state.photos } />

                    <h2 style={{marginTop:"10pc"}}>Πληροφορίες Τοποθεσίας</h2>
                    <p >Παρε μετρο μετα λεωφορειο μετα κανε στροφη αριστερα μετα ξανα δεξεια και εκανες κυκλο τωρα ξανα απο την αρχη και ετσι θα με βρεις χαχα χιχι χοχο</p>
					<Gmap ads = {[this.state.info]} height={"40vh"} width={"100%"} marginTop={"10px"}/>
 
                </div>
            )}
            </div>

        )
    }
}

export default AdPreview;
