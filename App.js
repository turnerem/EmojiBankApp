import React from 'react';
import StoreProvider from './store';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupLogin from './src/SignupLogin';
import AddCategories from './src/AddCategories';
import Spreadsheet from './src/Spreadsheet';

const Stack = createStackNavigator();
export default function App() {
  return (
    // <View style={{backgroundColor: 'ivory'}}>
      <StoreProvider>
        <NavigationContainer >
          <Stack.Navigator>
            <Stack.Screen name="Login / Signup" component={SignupLogin} />
            <Stack.Screen name="Add Categories" component={AddCategories} />
            <Stack.Screen name="Spreadsheet" component={Spreadsheet} />
          </Stack.Navigator>
        </NavigationContainer>
      </StoreProvider>

    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
