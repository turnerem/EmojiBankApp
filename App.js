import React, { useEffect } from 'react';
import StoreProvider from './store';
import { AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignupLogin from './src/SignupLogin';
import AddCategories from './src/AddCategories';
import Spreadsheet from './src/Spreadsheet';
import connection from './database/Connection';

const Stack = createStackNavigator();
// const { closeDb } = connection();
export default function App() {
  
  useEffect(() => {
    AppState.addEventListener("change", (appState) => console.log("The app state", appState))
    // console.log("Closing DB!")
    // is useEffect (in App.js) basically already checking whether or not AppState is active?
    // LOOK in console.log - DB is getting closed when app opens (because we're immediately navigating to another view?). This won't do
    // Maybe need a reducer to track background/foreground transitions. Could even use this instead of setting this.databse in the constructor of Database.js
    // return connection.closeDb();
    
  })
  // updating db. Now tracking AppState in App.js, and closeing DB at appropriate moment.'
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
