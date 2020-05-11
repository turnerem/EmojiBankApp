import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const CatItem = (item) => {
  return (
    <View style={styles.container}>
      <View style={[ styles.catEmojiBox, styles.textBox ]}>
        <Text style={styles.catEmoji}>{item.catEmoji}</Text>
      </View>
      <View style={[ styles.catBox, styles.textBox ]}>
        <Text style={styles.cat}>{item.cat}</Text>
      </View>
    </View>
  )
}

export default CatItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderBottomWidth: 3
  },
  textBox: {
    padding: 10,
    borderBottomWidth: 1
  },
  catEmojiBox: {
    flex: 1,
    // paddingLeft: 20,
    borderRightWidth: 1,
  },
  catBox: {
    flex: 3,
    // padding: 10
  },
  cat: {
    fontSize: 16
  },
  catEmoji: {
    fontSize: 16,
    textAlign: 'center'
  },

})
