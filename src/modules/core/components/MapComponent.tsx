import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import tw from 'twrnc'
import MapView, {Marker} from 'react-native-maps'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../../../../redux/slices/navSlice'
import { useDispatch, useSelector } from 'react-redux'
import MapViewDirections from 'react-native-maps-directions'
import { REACT_APP_GOOGLE_API_KEY } from "@env"

const MapComponent = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef<any>();
  const dispatch = useDispatch();

  /*
  TO DO:

  It is necessary to fix zoom out in map wht two marks are selected

  */

  useEffect(()=>{
    if (!origin || !destination) return;
    //Zoom and fit to markers -> Doesnt work
    mapRef?.current?.fitToSuppliedMarkers(['origin', 'destination'],{
      edgePadding: {top: 50, right: 50, bottom: 50, left: 50}
    });
  }, [origin, destination]);

  useEffect(()=>{

    if (!origin || !destination) return;

    const getTravelTime = async() =>{
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
      units=imperial
      &origins=${origin.description}
      &destinations=${destination.description}
      &key=${REACT_APP_GOOGLE_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
      })
      .catch(error => console.log(error.message));
    }

    getTravelTime();
  },[origin, destination, REACT_APP_GOOGLE_API_KEY])

  return (
    <MapView
      style={tw`flex-1`}
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}>
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={REACT_APP_GOOGLE_API_KEY}
          strokeWidth={3}
          strokeColor='black'
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title='Origin'
          description={origin.description}
          identifier="origin"/>
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title='Destination'
          description={destination.description}
          identifier="destination" />
      )}
    </MapView>
  )
}

export default MapComponent

const styles = StyleSheet.create({})