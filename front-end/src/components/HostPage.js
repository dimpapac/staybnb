import React, {Component} from 'react'
import { withRouter } from 'react-router'
import AdListItem from './AdListItem'
import Gmap from './Gmap'

import { adService } from '../services/ad.service'



class HostPage extends Component
{

    constructor(props , context) 
    {
        super(props , context);
        this.state = {
            area : "none",
            no_posts: true,
            visiblePosts: 0,
            ads : [],
            no_result : true,
            coordinates : [],
            isloading : true,
            counter : 0,
            current : 0,
            elevator : false,
            parking : false,
            tv : false ,
            kitchen : false,
            heat : false,
            airco : false,
            wifi : false
        };
        let user = JSON.parse(localStorage.getItem("user"))
        if ((user && user.userType!==2) || !user) {
            this.props.history.push('/')
        }
    }


    componentDidMount() {

      let coordinate = {}; //object of coordinates
      let coordinates = [] //array of objects of coordinates
      const id = JSON.parse(localStorage.getItem('user'))._id

      adService.get_host_ads(id)
      .then( response => {
          if (response.length>0){
              this.setState({
                  ads : response,
                  no_posts : false,
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

    render() {
      return (
        <div style = {{ marginTop : "10px"}}>
          { this.state.no_posts &&
          <button style={{height:'47.5px'}} type="submit" className=" btn btn-primary mb-2" onClick={() => this.props.history.push("/newAd")}>Προσθήκη καταλύματος</button>
          } 
        { !this.state.no_posts && ( 
          <div class ="float-left"  className = "scrolls " style={{width:"58%",float:"left",marginLeft:"10px" , height: "85vh" ,overflow: "scroll"}}>
                    <button style={{height:'47.5px'}} type="submit" className=" btn btn-primary mb-2" onClick={() => this.props.history.push("/newAd")}>Προσθήκη καταλύματος</button>
                  
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
                      flag={3}
                  />
                </div>
              )     			
            })}	
          </div>
        )}


        {(this.state.coordinates.length > 0 && !this.state.isloading && !this.state.no_posts ) && (
          <Gmap withMarkers={true} ads = {this.state.ads} height={"90vh"} width={"40%"} marginTop={"0px"} />
        )}  


    </div>
    );
    }
}

export default withRouter(HostPage);
