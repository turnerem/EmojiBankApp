import React, { useContext, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import { StoreContext } from '../store';
import { TouchableHighlight } from 'react-native-gesture-handler';
import CatItem from './components/CatItem';
import AddCat from './components/AddCat';
import { useNavigation } from '@react-navigation/native';
import fetchCats from '../database/fetchCats'
// import connection from "../database/Connection"

const AddCategories = () => {
  const { 
    categories, setCategories,
    catsCount
  } = useContext( StoreContext );
  // const [ categories, setCategories ] = useState( [] );
  const navigation = useNavigation()

  useEffect(() => {
    // fetchCats.deleteAllCats()
    fetchCats.getCats().then((data) => {
      setCategories(data)
    })
  }, [ catsCount ])

  // useEffect(() => {
    
  //   // setCategories(pp)
  // })


  // console.log(categoriesC[0])
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={ categories }
        renderItem={({ item }) => <CatItem {...item} />}
        keyExtractor={(item) => item.cat}
      />
      {/* only display AddCat if either there's nothing in catarray already or user has pressed button to add new cat */}
      {(categories === undefined || categories.length < 6) && <AddCat 
        style={styles.catInput}
      />}
      <View style={styles.buttonBox}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate("Spreadsheet")}
        >
          <Text style={styles.buttonText}>
            Done
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default AddCategories

const styles = StyleSheet.create({
  container: { 
    // flex: 1, 
    // justifyContent: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'ivory' ,
  },
  list: { 
    // flex: 0,
    marginTop: 10,
    // marginBottom: 10,
  },
  catInput: {
    // flex: 1
  },
  buttonBox: {
    flexDirection: 'row', 
    justifyContent: 'center'
  }
})
