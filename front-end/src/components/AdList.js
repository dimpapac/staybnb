import React, {Component} from 'react'
import '../css/searchbar.css';

import AdListItem from './AdListItem'
import Gmap from './Gmap'
import Modal from 'react-bootstrap/Modal'

import { adService } from '../services/ad.service'



class AdList extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            area : "none",
            startDate : this.props.location.state.startDate,
            endDate : this.props.location.state.endDate,
            no_posts: true,
            visiblePosts: 0,
            ads : [],
            no_result : true,
            coordinates : [],
            isloading : true,
            counter : 0,
            current : 0,
            visitors: this.props.location.state.visitors,
            location: this.props.location.state.location,
            elevator : false,
            parking : false,
            tv : false ,
            kitchen : false,
            heat : false,
            airco : false,
            wifi : false
        }
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.loadnext = this.loadnext.bind(this)
        this.loadprev = this.loadprev.bind(this)
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    } 

    handleCheckBox = event => {
        const {name,value} = event.target;
        const newVal = !this.state.[name]
        this.setState({
            [name] : newVal
        })
    }

    handleSearchButton(item){
        this.props.history.push(item);
    }

    loadnext(){
            let coordinate = {}; //object of coordinates
            let coordinates = [] //array of objects of coordinates
            adService.get_available_ads(this.state.counter,10,this.state.startDate, this.state.endDate,this.state.visitors,this.state.location)
            .then( response => {
                if ( response.length > 0) {
                    this.setState((prevState,props) => ({
                        ads : response,
                        no_posts : false,
                        visiblePosts: response.length,
                        no_result : false,
                        counter : prevState.counter + response.length,
                        current : response.length
                    }))
        
                    this.state.ads.forEach(ad => { /*Loop through every row of the jsonfile and get the attributes*/
                        /*define the new coordinate */
                        coordinate = {}
                        coordinate['lat'] = ad.location['latitude']
                        coordinate['lng'] = ad.location['longitude']    
                        /* Push it to the array of coordinates */
                        coordinates.push(coordinate)
                    })
        
                    this.setState({
                        coordinates: coordinates,
                        isloading : false
                    })
                }
            });	
    }

    loadprev(){
        if ( this.state.counter - 10 > 0 ) {
            let coordinate = {}; //object of coordinates
            let coordinates = [] //array of objects of coordinates
            adService.get_available_ads(this.state.counter - this.state.current - 10,10,this.state.startDate, this.state.endDate,this.state.visitors,this.state.location)
            .then( response => {
                this.setState((prevState,props) => ({
                    ads : response,
                    no_posts : false,
                    visiblePosts: response.length,
                    no_result : false,
                    counter : prevState.counter - prevState.current,
                    current : response.length

                }))

                this.state.ads.forEach(ad => { /*Loop through every row of the jsonfile and get the attributes*/
                    /*define the new coordinate */
                    coordinate = {}
                    coordinate['lat'] = ad.location['latitude']
                    coordinate['lng'] = ad.location['longitude']    
                    /* Push it to the array of coordinates */
                    coordinates.push(coordinate)
                })

                this.setState({
                    coordinates: coordinates,
                    isloading : false
                })
            });	
        }
    }



    componentDidMount() {

        let coordinate = {}; //object of coordinates
        let coordinates = [] //array of objects of coordinates

        adService.get_available_ads(0,10,this.state.startDate, this.state.endDate,this.state.visitors,this.state.location)
        .then( response => {
            if (response.length>0){
                this.setState({
                    ads : response,
                    no_posts : false,
                    visiblePosts: response.length,
                    no_result : false,
                    current : response.length,
                    counter : response.length
                })

                this.state.ads.forEach(ad => { /*Loop through every row of the jsonfile and get the attributes*/
                    /*define the new coordinate */
                    coordinate = {}
                    coordinate['lat'] = ad.location['latitude']
                    coordinate['lng'] = ad.location['longitude']    
                    /* Push it to the array of coordinates */
                    coordinates.push(coordinate)
                })

                this.setState({
                    coordinates: coordinates,
                    isloading : false
                })

            }
            else{
                console.log(response)
                this.setState({
                    ads : response,
                    no_result : false,
                })
            }
        });	


    }

    handleShow(){
        this.setState({ 
            setShow: true
        });
    };

    handleClose(){
        this.render()
        this.setState({ 
            setShow: false
        });
    };

    render() { 

        return (
            <div style = {{ marginTop : "10px"}}>
                { !this.state.no_posts && ( 
					<div class ="float-left"  className = "scrolls " style={{width:"58%",float:"left",marginLeft:"10px" , height: "85vh" ,overflow: "scroll"}}>
                    <button type="button" style={{width:"20%" , marginBottom:"10px"}} class="btn btn-outline-secondary" onClick={this.handleShow}> Προσθήκη Φίλτρων</button>
                    <Modal size="lg" show={this.state.setShow} onHide={this.handleClose} >
                        <Modal.Header  closeButton >
                        </Modal.Header>
                        <Modal.Body>
                            <div class="text-center row">
                            <div class="col-3">
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="wifi" />
                                    <label class="form-check-label" for="wifi">Wifi</label>
                                </div>

                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="airco" />
                                    <label class="form-check-label" for="airco">Κλιματισμός</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="heat" />
                                    <label class="form-check-label" for="heat">Θέρμανση</label>
                                </div> 
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="kitchen" />
                                    <label class="form-check-label" for="kitchen">Κουζίνα</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="tv" />
                                    <label class="form-check-label" for="tv">Τηλεόραση</label>
                                </div>
                                <div class="form-group form-check">
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="parking" />
                                    <label class="form-check-label" for="parking">Parking</label>
                                </div>
                            </div>
                            <div class="col-3">
                                <div class="form-group form-check"> 
                                    <input type="checkbox" class="form-check-input" onClick={this.handleCheckBox} name="elevator" />
                                    <label class="form-check-label"  for="elevator">Ανελκυστήρας</label>
                                </div>
                            </div>
                        </div>
                        </Modal.Body>
                    </Modal>
						{this.state.ads.map((ad) => {//Loop through every row of the json file and get the attributes
							return (
								<div  class="list-group">
                                    <AdListItem // Render the same Component with different values each time 
                                        history = {this.props.history}
										ad = {ad}
                                        style = {{marginLeft: '30%'}} 
                                        key = {ad._id}
                                        elevator = {this.state.elevator}
                                        parking = {this.state.parking}
                                        tv = {this.state.tv}
                                        kitchen={this.state.kitchen}
                                        heat={this.state.heat}
                                        airco={this.state.airco}
                                        wifi={this.state.wifi}
									/>
								</div>
							)     			
						})}	
					</div>
				)}
    
                { !this.state.no_posts &&  (
                <div class="bottom-align-text text-center" style={{height: "1vh",width : "50%"}}>
                        <button type="button" class="btn btn-outline-secondary" onClick={this.loadprev} >Prev Page</button>
                        <button type="button" class="btn btn-outline-secondary" onClick={this.loadnext} >Next Page</button>
                </div>
                )}

                {(this.state.coordinates.length > 0 && !this.state.isloading && !this.state.no_posts ) && (
					<Gmap withMarkers={true} ads = {this.state.ads} height={"90vh"} width={"40%"} marginTop={"0px"} />
                )}  
        
                {this.state.no_posts && !this.state.no_result && (
                    <div class="col">
                        <h1 class=" = text-center">Δεν υπάρχουν αποτελέσματα για την ημερομηνία/περιοχή/άτομα που ζητήσατε </h1>
                        <button type="button" style={{marginTop:"5%",height:"5vh",marginLeft:"40%",width:"20%"}} class="  text-center btn btn-primary " onClick={ () => { this.props.history.push('/');}}> Επιστροφή στην αρχική</button>
                    </div>
                )}

            </div>
        )
    }
}

export default AdList
