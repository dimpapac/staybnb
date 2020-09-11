import React, { Component , useEffect, useRef , useState } from 'react';
import { GoogleMap , withScriptjs , withGoogleMap , Marker , InfoWindow } from "react-google-maps"
import Carousel from "./Carousel"


class GMap extends Component 
{
  constructor (props , context) {
    super( props , context )
    this.state = {
        apartments : props.apartments,
        mapLoading : true 
    }
  }

  componentDidMount(){
    this.setState({
        mapLoading : false
    })
  }
  
  render() {

    const WrappedMap = withScriptjs(withGoogleMap(Map))

    const apartments = this.state.apartments

    function Map() {

      const [selectedApartment , setSelectedApartment] = useState(null);

      return (
        <GoogleMap defaultZoom={10} defaultCenter={{lat : apartments[0].location['latitude'] , lng : apartments[0].location['longitude']}} >
          {apartments.map((apartment)=> (
            <Marker 
            key = {apartment._id}
            position={{lat:apartment.location['latitude'],lng: apartment.location['longitude']}}
            onClick={() => {
              setSelectedApartment(apartment);
            }}
            />
          ))}


          {selectedApartment && (
            <InfoWindow
            position={{lat:selectedApartment.location['latitude'],lng: selectedApartment.location['longitude']}}


            onCloseClick = {() => {
              setSelectedApartment(null);
            }}
            >
              <div>
                <h4>{selectedApartment.title}</h4>
                <p>{selectedApartment.price}$ per night</p>
              </div>
            </InfoWindow>
          )}

        </GoogleMap>
      );
    }

    return (
      <div style={{width: '45%',height: '90vh',float :"right",marginRight:"10px"}}>
      {(!this.state.mapLoading) && (
        <WrappedMap 
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAeur1jFduk6ZSJT0nRAh7rzTIDsfylvVY`} 
        loadingElement = {<div style={{ height : "100%" }}/> }
        containerElement = {<div style={{ height : "100%" }}/> }
        mapElement = {<div style={{ height : "100%" }}/> }
        />
      )}
      </div>
    )
  }

}

export default GMap;