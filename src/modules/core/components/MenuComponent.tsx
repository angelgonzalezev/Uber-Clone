import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import tw from 'twrnc';
import { selectOrigin } from '../../../../redux/slices/navSlice';


const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: require('../../../assets/uber-maps-menu.png'),
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: require('../../../assets/uber-eats-menu.png'),
    screen: 'EatsScreen',
  }
]

const MenuComponent = () => {

  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen as never)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          disabled={!origin}
        >
          <View style={!origin && tw`opacity-20`}>
            <Image
              source={item.image}
              style={{width: 120, height: 120, resizeMode: 'contain'}}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Image
              source={require('../../../assets/arrow-right.png')}
              style={[{width: 50, height: 50, resizeMode: 'contain'}, tw`p-2 mt-2`]}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default MenuComponent

const styles = StyleSheet.create({})