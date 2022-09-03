import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectDestination, selectTravelTimeInformation } from '../../../../redux/slices/navSlice'

const data = [
  {
    id: 'Uber-X-123',
    title: 'UberX',
    image: require('../../../assets/UberX.png'),
    multiplier: 1,
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    image: require('../../../assets/UberXL.png'),
    multiplier: 1.2,
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    image: require('../../../assets/Lux.png'),
    multiplier: 1.75,
  },
]


const RideOptionsCardComponent = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<any>();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const destination = useSelector(selectDestination);
  const SURGE_CHARGE_RATE = 1.5;

  return (
    <SafeAreaView style={[tw`bg-white flex-grow`]}>
      <View>
        <TouchableOpacity
          style={[tw`absolute top-3 z-50 p-3 rounded-full`]}
          onPress={() => navigation.navigate('NavigateCardComponent' as never)}
        >
          <Image
          source={require('../../../assets/back-icon.png')}
          style={[{height: 25, width: 25, resizeMode:'contain'}]}/>
        </TouchableOpacity>
        <Text style={[tw`text-center py-5 text-xl font-semibold text-black`]}>
          Select a Ride - {travelTimeInformation?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item)=> item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[
              item.id === selected?.id ?
                tw`flex-row justify-between items-center px-10 bg-gray-200`
              :
                tw`flex-row justify-between items-center px-10`
            ]}
            onPress={() => setSelected(item)}
          >
            <Image
              source={item.image}
              style={[{width:70, height: 70, resizeMode: 'contain'}]}
            />
            <View style={[tw`-ml-6`]}>
              <Text style={[tw`text-xl font-semibold text-black`]}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={[tw`text-xl font-semibold text-black`]}>${(travelTimeInformation?.duration?.value*SURGE_CHARGE_RATE*item.multiplier/100).toFixed(2)}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={[tw`mt-auto border-t border-gray-200`]}>
        <TouchableOpacity disabled={!selected} style={[selected ? tw`bg-black py-3 m-3` : tw`bg-gray-300 py-3 m-3`]}>
          <Text style={[tw`text-center text-white text-xl`]}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCardComponent

const styles = StyleSheet.create({})