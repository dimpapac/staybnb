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
            isloading : true
        }
        this.handleSearchButton = this.handleSearchButton.bind(this);
    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }

    componentDidMount() {

        let coordinate = {}; //object of coordinates
        let coordinates = [] //array of objects of coordinates
        

        adService.get_available_ads(0,10,this.state.startDate, this.state.endDate)
        .then( response => {
            this.setState({
                ads : response,
                no_posts : false,
                visiblePosts: this.state.visiblePosts + 8,
                no_result : false
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
					<div class ="float-left" className = "scrolls" style={{width:"60%",float:"left",marginLeft:"10px"}}>
						{this.state.ads.map((ad) => {//Loop through every row of the json file and get the attributes
							return (
								<div key = {ad._id}>
                                    <AdListItem // Render the same Component with different values each time 
                                        history = {this.props.history}
										ad = {ad}
										style = {{marginLeft: '30%'}} 
									/>
								</div>
							)     			
						})}	
					</div>
				)}
                

                {(this.state.coordinates.length > 0 && !this.state.isloading) && (
					<Gmap ads = {this.state.ads} size={{ width:'30%', height:'30%', marginLeft:'63%'}} />
                )}  

            </div>
        )
    }
}

export default AdList