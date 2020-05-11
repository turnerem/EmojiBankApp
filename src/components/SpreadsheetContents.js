import React, { useContext } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { StoreContext } from '../../store'
import SpreadsheetItem from './SpreadsheetItem';

const SpreadsheetContents = () => {
  const { categories, isSave } = useContext(StoreContext);
  return (
      <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({item}) => {
          // console.log("THE ITEM", item);
          // return <Text>an item</Text>
         return <SpreadsheetItem {...item} />
        }}
        keyExtractor={item => item.cat}
      />
    </View>
  )
}

export default SpreadsheetContents

const styles = StyleSheet.create({
  container: { 
    // flex: 1, 
    // justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'ivory' ,
  },
})
