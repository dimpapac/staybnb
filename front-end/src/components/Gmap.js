import React, { Component , useEffect, useRef , useState } from 'react';
import { GoogleMap , withScriptjs , withGoogleMap , Marker , InfoWindow } from "react-google-maps"
import Carousel from "./Carousel"


class GMap extends Component 
{
  
  constructor (props , context) {
    super( props , context )
    this.state = {
        ads : props.ads,
        mapLoading : true,
        height : props.height,
        width: props.width,
        marginTop : props.marginTop,
        withMarkers : props.withMarkers,
        lat : null,
        selectedPosition: null

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
    const wm = this.state.withMarkers


    const handleClick = (event) => {
      this.props.action(event.latLng.lat(),event.latLng.lng())
      this.setState({
        selectedPosition : {
          latitude : event.latLng.lat(),
          longitude: event.latLng.lng()
        }
      }) 
      this.render()
    }

    
    const selectedPosition = this.state.selectedPosition
    

    function Map() {

      const [selectedAd , setSelectedAd ] = useState(null);
      return (
        <div>
        { wm &&(
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
          )
        </GoogleMap>
        )}

        {!wm && selectedPosition == null ?(
           <GoogleMap onClick={(e) => handleClick(e)} defaultZoom={10} defaultCenter={{lat : 38 , lng : 23 }} >
           </GoogleMap>
        )
        :
        (
          <GoogleMap onClick={(e) => handleClick(e)} defaultZoom={10} defaultCenter={{lat : selectedPosition['latitude'] , lng : selectedPosition['longitude'] }} >
             {selectedPosition != null && (
               <Marker 
                position={{lat: selectedPosition['latitude'],lng:  selectedPosition['longitude']}}
              />
             )}
           </GoogleMap>
        )
      }

        </div>
      );
    }

    return (
      <div style={{width: this.state.width ,height: this.state.height ,float :"right",marginRight:"10px",marginTop : this.state.marginTop}}>
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