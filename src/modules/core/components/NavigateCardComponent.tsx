import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { REACT_APP_GOOGLE_API_KEY } from '@env'
import { useDispatch } from 'react-redux'
import { setDestination } from '../../../../redux/slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavouritesComponent from './NavFavouritesComponent'

const NavigateCardComponent = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center text-black text-xl pt-5`}>Goord morning, Angel</Text>
      <View style={tw`border-t border-gray-50 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            styles={googleInputBox}
            query={{
              key: REACT_APP_GOOGLE_API_KEY,
              language: 'en',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            minLength={2}
            enablePoweredByContainer={false}
            fetchDetails={true}
            onPress={(data, details) => {
              dispatch(
                setDestination({
                location: details?.geometry.location,
                description: data.description
                })
              );
              navigation.navigate("RideOptionsCardComponent" as never);
            }}
          />
        </View>
        <NavFavouritesComponent />
      </View>
      <View style={[tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`]}>
        <TouchableOpacity style={[tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full justify-between`]}
          onPress={() => navigation.navigate('RideOptionsCardComponent' as never)}
        >
          <Image
            source={require('../../../assets/car-icon.png')}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
          />
          <Text style={[tw`text-white text-center`]}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[tw`flex flex-row w-24 px-4 py-3 rounded-full justify-between border-black border-2`]}>
          <Image
            source={require('../../../assets/eats-icon.png')}
            style={{ width: 20, height: 20, resizeMode: 'contain' }}
          />
          <Text style={[tw`text-black ml-2 text-center`]}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCardComponent

const googleInputBox = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput:{
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer:{
    paddingHorizontal: 20,
    paddingBottom: 0,
  }
})