import React, { useContext } from 'react'
import { StoreContext } from '../../store';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import fetchCats from '../../database/fetchCats'

const AddCat = () => {
  const { 
    cat, setCat, 
    catEmoji, setCatEmoji, 
    categories, setCategories,
    catsCount, setCatsCount 
  } = useContext( StoreContext )

  // const { isLoading, hasErrored, errMsg, data, addItem }
  // What to pass to useDb here? Categories from context?
  // that's mixing useState and useReducer!
  // const { data, sql } = useDb()

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={[ styles.catEmojiBox, styles.fieldBox ]}>
          <TextInput
            style={[ styles.catEmojiInput, styles.input ]}
            placeholder="Emoji"
            spellCheck={false}
            autoCorrect={false}
            value={catEmoji}
            onChangeText={setCatEmoji}
          />
        </View>
        <View style={[ styles.catBox, styles.fieldBox ]}>
          <TextInput
            style={[ styles.catInput, styles.input ]}
            placeholder="Description"
            spellCheck={false}
            autoCorrect={false}
            value={cat}
            onChangeText={setCat}
          />
        </View>
      </View>
      <View style={styles.buttonBox} >
        <TouchableHighlight
          style={styles.button}
          onPress={() => {
            fetchCats.addCat(cat, catEmoji).then(data => {
              setCategories([...categories, {cat_id: data, cat, cat_emoji: catEmoji}])
              // console.log(categories)
              
            })
            setCatsCount(catsCount + 1)
            setCat("");
            setCatEmoji("");
          }}
        >
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default AddCat

const styles = StyleSheet.create({
  container: {
    // borderWidth: .5
  },
  inputContainer: {
    flexDirection: 'row',
  },
  fieldBox: {
    // margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    // borderColor: 'purple',
  },
  catEmojiBox: {
    flex: 1,
    borderRightWidth: 1
    // marginLeft: 10,
    // paddingLeft: 20
  },
  catBox: {
    flex: 3,
    // marginLeft: 15
  },
  input: {
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: 'silver',
    // margin: 5,
    padding: 10,
    fontSize: 16
  },
  catInput: {
    
  },
  catEmojiInput: {
    textAlign: 'center',
    // paddingLeft: 5,
    // marginLeft: 10
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    padding: 10,
    width: 100,
    margin: 10,
    // marginLeft: 120,
    // marginRight: 120,
    borderWidth: .5,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18
  }
})
