import React, { useEffect, useRef } from 'react';
import { GoogleMap , withScriptjs , withGoogleMap } from "react-google-maps"

function GMap(props)
{
  return (
    <div style={{width: '40%',height: '100vh',float :"right"}}>
      <WrappedMap 
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAeur1jFduk6ZSJT0nRAh7rzTIDsfylvVY`} 
      loadingElement = {<div style={{ height : "100%" }}/> }
      containerElement = {<div style={{ height : "100%" }}/> }
      mapElement = {<div style={{ height : "100%" }}/> }
      />
    </div>
  )
}

function Map() {
  return (
    <GoogleMap defaultZoom={10} defaultCenter={{lat:12,lng: 12 }} />
  );
}
const WrappedMap = withScriptjs(withGoogleMap(Map))

export default GMap;