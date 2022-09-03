import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import {Icon} from 'react-native-elements'

/*
TODO:
- It is necessary to modify data.icon into a svg icon element instead of image
*/

const data = [
  {
    id: '123',
    icon: require('../../../assets/home-icon.png'),
    location: 'Home',
    destination: 'Calle San Millán, Málaga, Spain'
  },
  {
    id: '456',
    icon: require('../../../assets/work-icon.png'),
    location: 'Work',
    destination: 'Andalusia Technology Park, Málaga, Spain'
  }
]
const NavFavouritesComponent = () => {

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => (<View style={tw`bg-gray-200 h-0.5`}/>)}
      renderItem={({ item: {location, destination, icon} }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5`}
        >
          <View style={[tw`h-10, w-10 bg-gray-200 rounded-full items-center justify-center mr-4`]}>
            <Image
              source={icon}
              style={{ width: 18, height: 18, resizeMode: 'contain' }}
            />
          </View>
          <View>
            <Text style={tw`font-semibold text-lg text-black`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavFavouritesComponent

const styles = StyleSheet.create({})