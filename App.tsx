import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/modules/core/screens/HomeScreen';
import MapScreen from './src/modules/core/screens/MapScreen';
import { enableLatestRenderer } from 'react-native-maps';

const App = () => {
  const Stack = createNativeStackNavigator();
  enableLatestRenderer();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset = {Platform.OS === 'ios' ? -64 : 0}>
            <Stack.Navigator>
              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='MapScreen'
                component={MapScreen}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
