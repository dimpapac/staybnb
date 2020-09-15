import React, { Component , useEffect, useRef , useState } from 'react';
import { GoogleMap , withScriptjs , withGoogleMap , Marker , InfoWindow } from "react-google-maps"
import Carousel from "./Carousel"


class GMap extends Component 
{
  
  constructor (props , context) {
    super( props , context )
    this.state = {
        ads : props.ads,
        mapLoading : true 
    }
  }

  componentDidMount(){
    this.setState({
        mapLoading : false
    })
  }

  componentDidUpdate(prevProps,prevState){
    console.log(this.state.ads)
    this.state.ads = this.props.ads
    this.render()
  }
  
  render() {
    const WrappedMap = withScriptjs(withGoogleMap(Map))

    const ads = this.state.ads
    console.log(3)

    function Map(  ) {
      const [selectedAd , setSelectedAd ] = useState(null);
      return (
        <GoogleMap defaultZoom={10} defaultCenter={{lat : ads[0].location['latitude'] , lng : ads[0].location['longitude']}} >
          {ads.map((ad)=> (
            <Marker 
            key = {ad._id}
            position={{lat:ad.location['latitude'],lng: ad.location['longitude']}}
            onClick={() => {
              setSelectedAd(ad);
            }}
            />
          ))}


          {selectedAd && (
            <InfoWindow
            position={{lat:selectedAd.location['latitude'],lng: selectedAd.location['longitude']}}


            onCloseClick = {() => {
              setSelectedAd(null);
            }}
            >
              <div>
                <h4>{selectedAd.title}</h4>
                <p>{selectedAd.price}$ per night</p>
              </div>
            </InfoWindow>
          )}

        </GoogleMap>
      );
    }

    return (
      <div style={{width: '48%',height: '90vh',float :"right",marginRight:"10px"}}>
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