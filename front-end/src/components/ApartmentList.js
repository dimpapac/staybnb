import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import ApartmentListItem from './ApartmentListItem'
import Gmap from './Gmap'

import { apartmentService } from '../services/apartment.service'



class ApartmentList extends Component {

    constructor (props , context) {
        super( props , context )
        this.state = {
            area : "none",
            startDate : "11-03-2020",
            endDate : "13-05-2020",
            no_posts: true,
            visiblePosts: 0,
            apartments : [],
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
        

        apartmentService.get_available_apartments(0,10,this.state.startDate, this.state.endDate)
        .then( response => {
            this.setState({
                apartments : response,
                no_posts : false,
                visiblePosts: this.state.visiblePosts + 8,
                no_result : false
            })

            this.state.apartments.forEach(apartment => { /*Loop through every row of the jsonfile and get the attributes*/
                /*define the new coordinate */
                coordinate = {}
                coordinate['lat'] = apartment.location['latitude']
                coordinate['lng'] = apartment.location['longitude']    
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
					<div class ="float-left" className = "scrolls" style={{width:"50%",float:"left",marginLeft:"10px"}}>
						{this.state.apartments.map((apartment) => {//Loop through every row of the json file and get the attributes
							return (
								<div key = {apartment._id}>
									<ApartmentListItem // Render the same Component with different values each time 
										apartment = {apartment}
										style = {{marginLeft: '30%'}} 
									/>
								</div>
							)     			
						})}	
					</div>
				)}
                

                {(this.state.coordinates.length > 0 && !this.state.isloading) && (
					<Gmap apartments = {this.state.apartments} size={{ width:'40%', height:'30%', marginLeft:'63%'}} />
                )}  

            </div>
        )
    }
}

export default ApartmentList