import React, {Component} from 'react'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import Carousel from './Carousel'





class PhotoGrid extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            photos : props.photos,
            info : props.info
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    } 

    componentDidMount(){
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
            { this.state.photos.length == 1 && (
                <div class="row">
                    <img  class="img img-responsive " style={{borderRadius:"25px",width:"80%",height:"45vh",marginLeft:"10%"}} src={this.state.photos[0]}/>
                </div>
            )}

            { this.state.photos.length == 2 && (

                <div class="row" style={{width:"100%",height:"45vh"}}>
                    <div  style={{width:"50%"}}>
                        <img  src={this.state.photos[0]} style={{borderTopLeftRadius:"25px",borderBottomLeftRadius:"25px",width:"100%",height:"100%"}}/>
                    </div>
                    <div  style={{width:"50%"}} >
                        <img  src={this.state.photos[1]} style={{borderTopRightRadius:"25px",borderBottomRightRadius:"25px",width:"100%",height:"100%"}}/>
                    </div>
                </div>
            )}

            { this.state.photos.length >= 3 && (

            <div class="row" style={{width:"100%",height:"45vh"}}>
                <div  style={{width:"60%",height:"100%"}}>
                    <img  src={this.state.photos[0]} style={{borderTopLeftRadius:"25px",borderBottomLeftRadius:"25px",width:"100%",height:"100%"}}/>
                </div>
                <div class="col" style={{width:"40%",height:"45vh"}}>
                    <div  style={{height:"50%"}} >
                        <img  src={this.state.photos[1]} style={{borderTopRightRadius:"25px",width:"100%",height:"100%"}}/>
                    </div>
                    <div  style={{height:"50%"}} >
                        <img  src={this.state.photos[2]} style={{borderBottomRightRadius:"25px",width:"100%",height:"100%"}}/>
                    </div>
                </div>
            </div>
            )}

            <button  type="button" class="btn btn-primary" style={{marginLeft:"30%",width:"40%",marginTop:"5%"}} onClick={this.handleShow}>Περισσότερες Φωτογραφίες</button>
            <Modal size="lg" show={this.state.setShow} onHide={this.handleClose} >
                    <Modal.Header  closeButton >
                    </Modal.Header>
                    <Modal.Body>
                    <div class="text-center" style={{width : "100%"}}>
                        <Carousel ad={this.state.info} height={"30pc"} width={"12pc"}/>
                    </div>
                    </Modal.Body>
            </Modal>
            </div>
        )
    }
}

export default PhotoGrid;
