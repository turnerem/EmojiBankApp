import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { StoreContext } from '../../store'
import SpreadsheetContents from './SpreadsheetContents';

const SaveSpreadsheet = () => {
  const { setIsSave } = useContext(StoreContext);
  setIsSave(true);

  return (
    <View>
      <SpreadsheetContents />
    </View>
  )
}

export default SaveSpreadsheet
