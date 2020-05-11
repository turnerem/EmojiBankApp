import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StoreContext } from '../store';
import { FlatList } from 'react-native-gesture-handler';
import SpreadsheetItem from './components/SpreadsheetItem';
import { TabActions } from '@react-navigation/core';
import SaveSpreadsheet from './components/SaveSpreadsheet';
import SpendSpreadsheet from './components/SpendSpreadsheet';
import Profile from './components/Profile';

const Tab = createMaterialTopTabNavigator();

const Spreadsheet = () => {
  const { categories } = useContext(StoreContext)
  return (
    <Tab.Navigator>
      <Tab.Screen name="Savings" component={SaveSpreadsheet} />
      <Tab.Screen name="Splurges" component={SpendSpreadsheet} />
      <Tab.Screen name="⚙️" component={Profile} style={{width: 20}} />
    </Tab.Navigator>
  )
}

export default Spreadsheet

const styles = StyleSheet.create({


})
