import React, {Component} from 'react'
import logo from '../icons/mainlogo.png' 
import '../css/searchbar.css';
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'

import ApartmentListItem from './ApartmentListItem'

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
        }
        this.handleSearchButton = this.handleSearchButton.bind(this);
    } 

    handleSearchButton(item){
        this.props.history.push(item);
    }

    componentDidMount() {

        apartmentService.get_available_apartments(0,10,this.state.startDate, this.state.endDate)
        .then( response => {
            this.setState({
                apartments : response,
                no_posts : false,
                visiblePosts: this.state.visiblePosts + 8,
                no_result : false
            })
        });	


    }

    render() { 
        console.log(this.state.no_posts)
        return (
            <div>
                {!this.state.no_result && !this.state.no_posts && ( 
					<div className = "scrolls">
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
            </div>
        )
    }
}

export default ApartmentList