import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import MapComponent from '../components/MapComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NavigateCardComponent from '../components/NavigateCardComponent';
import RideOptionsCardComponent from '../components/RideOptionsCardComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[tw`bg-gray-100 absolute top-5 left-5 z-50 p-3 rounded-full shadow-lg`]}
        onPress={() => navigation.navigate("HomeScreen" as never)}
      >
        <Image
          source={require('../../../assets/menu-icon.png')}
          style={[]}
        />
      </TouchableOpacity>
      <View style={tw`h-1/2`}>
        <MapComponent/>
      </View>
      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigateCardComponent'
            component={NavigateCardComponent}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='RideOptionsCardComponent'
            component={RideOptionsCardComponent}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen

const styles = StyleSheet.create({})

