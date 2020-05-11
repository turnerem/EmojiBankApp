import React, {useContext, useRef, useEffect, useState} from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'
import { TouchableHighlight, TextInput } from 'react-native-gesture-handler'
import { StoreContext } from '../../store'

const SpreadsheetItem = (item) => {
  console.log("The ITEMS")
  
  const { 
    tapped, setTapped,
    poundVal, setPoundVal
  } = useContext(StoreContext);

  const [ newAmt, setNewAmt ] = useState("");

  useEffect(() => {

  }, [newAmt])

  const growAnim = useRef(new Animated.Value(0)).current;
  const growBox = () => {
    if (tapped) {
      Animated.timing(growAnim, {
        toValue: 1.2,
        duration: 1000
      }).start() 
      setTapped(!tapped)
    } else {
      setPoundVal(poundVal + parseInt(newAmt !== "" ? newAmt : 0));
      setNewAmt("")
      Animated.timing(growAnim, {
        toValue: 0.0,
        duration: 1000
      }).start() 
      setTapped(!tapped)
    }
  }
  return (
    <TouchableHighlight 
      style={styles.button}
      onPress={growBox}
    >
      <View style={styles.container}>
        <View style={styles.textBox}>
          <Text style={styles.catEmoji}>
            {item.catEmoji}
          </Text>
          <Text style={styles.cat}>
            ( {item.cat} )
          </Text>
        </View>
        <View style={styles.numBox}>
        <Text style={styles.num}>
            £
          </Text>
          <Text style={styles.numVariable}>
            {poundVal.toFixed(2)}
          </Text>
        </View>
        <Animated.View style={[styles.inputBox, { flex: growAnim }]}>
          <TextInput 
            style={styles.input} 
            placeholer={0}
            keyboardType='numeric'
            value={Number(newAmt)}
            onChangeText={setNewAmt}
          />
        </Animated.View>
      </View>
    </TouchableHighlight>
  )
}

export default SpreadsheetItem

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  textBox: {
    // width: 300,
    flex: 3,
    flexDirection: 'row',
    padding: 10,
    borderRightWidth: 1
  },
  numBox: {
    width: 250,
    flex: 2,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    // borderBottomWidth: 1,
  },
  catEmoji: {
    fontSize: 18
  },
  cat: {
    fontSize: 12,
    color: 'gray'
  },
  num: {
    padding: 10,

    // textAlign: 'right',
    // borderWidth: 1,
    fontSize: 18,
    // textAlignVertical: 'center'
  },
  numVariable: {
    padding: 10,

    textAlign: 'right',
    // borderWidth: 1,
    fontSize: 18,
    // textAlignVertical: 'center'
  },
  inputBox: {
    // flex: 1
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: 'silver',
    padding: 8,
    margin: 2
  },
  input: {
    fontSize: 18
  }
})
