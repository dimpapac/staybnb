import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import AdListItem from './AdListItem'
import Gmap from './Gmap'

import { adService } from '../services/ad.service'



class AdList extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            area : "none",
            startDate : "11-03-2020",
            endDate : "13-05-2020",
            no_posts: true,
            visiblePosts: 0,
            ads : [],
            no_result : true,
            coordinates : [],
            isloading : true,
            counter : 0,
            current : 0
        }
        this.handleSearchButton = this.handleSearchButton.bind(this);
        this.loadnext = this.loadnext.bind(this)
        this.loadprev = this.loadprev.bind(this)
    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }

    loadnext(){
            let coordinate = {}; //object of coordinates
            let coordinates = [] //array of objects of coordinates
            adService.get_available_ads(this.state.counter,4,this.state.startDate, this.state.endDate)
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
        if ( this.state.counter - 4 > 0 ) {
            let coordinate = {}; //object of coordinates
            let coordinates = [] //array of objects of coordinates
            adService.get_available_ads(this.state.counter - this.state.current - 4,4,this.state.startDate, this.state.endDate)
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
        

        adService.get_available_ads(0,4,this.state.startDate, this.state.endDate)
        .then( response => {
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


        });	


    }

    render() { 

        return (
            <div style = {{ marginTop : "10px"}}>
                
                {!this.state.no_result && !this.state.no_posts && ( 
					<div class ="float-left"  className = "scrolls " style={{width:"50%",float:"left",marginLeft:"10px" , height: "85vh" ,overflow: "scroll"}}>
						{this.state.ads.map((ad) => {//Loop through every row of the json file and get the attributes
							return (
								<div  class="list-group">
                                    <AdListItem // Render the same Component with different values each time 
                                        history = {this.props.history}
										ad = {ad}
                                        style = {{marginLeft: '30%'}} 
                                        key = {ad._id}
									/>
								</div>
							)     			
						})}	
					</div>
				)}
    
                {!this.state.no_result && !this.state.no_posts &&  (
                <div class="bottom-align-text text-center" style={{height: "1vh",width : "50%"}}>
                        <button type="button" class="btn btn-outline-secondary" onClick={this.loadprev} >Prev Page</button>
                        <button type="button" class="btn btn-outline-secondary" onClick={this.loadnext} >Next Page</button>
                </div>
                )}

                {(this.state.coordinates.length > 0 && !this.state.isloading) && (
					<Gmap ads = {this.state.ads} size={{ width:'50%', height:'30%', marginLeft:'63%'}} />
                )}  
        

            </div>
        )
    }
}

export default AdList
