import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import ReactPhotoGrid from 'react-photo-grid'

import Gmap from './Gmap'
import Carousel from './Carousel'

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
                <div>
                    <h1 class="float-left">{this.state.info.title}</h1>
                    <div style={{width: "50%",marginLeft:"50%",background : "#E8E8E8" ,borderRadius: "25px",marginTop:"10px"}}>
                        { this.state.photos.length >= 3 && (
                        <ReactPhotoGrid
                            // onImageClick={this.handleImageClick}
                            data={this.state.photos}
                        />)}
                        { this.state.photos.length < 3 && (
                        <img src={this.state.photos[0]}/>)}
                    </div>
                    <button  type="button" class="btn btn-primary" style={{marginLeft:"70%",width:"15%"}} onClick={this.handleShow}>Περισσότερες Φωτογραφίες</button>
                    <Modal size="lg" show={this.state.setShow} onHide={this.handleClose} >
                        <Modal.Header  closeButton >
                        </Modal.Header>
                        <Modal.Body>
                        <div class="text-center" style={{width : "100%"}}>
                            <Carousel ad={this.state.info} height={"30pc"} width={"12pc"}/>
                        </div>
                        </Modal.Body>
                    </Modal>

					<Gmap ads = {[this.state.info]} height={"40vh"} width={"100%"} marginTop={"10px"}/>
 
                </div>
            )}
            </div>

        )
    }
}

export default AdPreview;
