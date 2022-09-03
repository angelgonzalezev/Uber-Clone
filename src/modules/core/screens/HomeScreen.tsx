import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc';
import MenuComponent from '../components/MenuComponent';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setDestination, setOrigin } from '../../../../redux/slices/navSlice';
import { useDispatch } from 'react-redux';
import { REACT_APP_GOOGLE_API_KEY } from "@env"
import NavFavouritesComponent from '../components/NavFavouritesComponent';

const HomeScreen = () => {

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[tw`bg-white h-full`]} >
      <View style={tw`p-5`}>
        <Image
          source={require('../../../assets/uber-logo.png')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain'
          }}
        />
        <GooglePlacesAutocomplete
          placeholder='Where form?'
          styles={{
            container: {
              flex: 0
            },
            textInput: {
              fontSize: 18,
            }
          }}
          query={{
            key: REACT_APP_GOOGLE_API_KEY,
            language: 'en',
          }}
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={400}
          minLength={2}
          enablePoweredByContainer={false}
          onPress={(data, details)=>{
            dispatch(setOrigin({
              location: details?.geometry.location,
              description: data.description
            }))
            dispatch(setDestination(null));
          }}
          fetchDetails={true}
        />
        <MenuComponent />
        <NavFavouritesComponent/>
      </View>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
})