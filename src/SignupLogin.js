import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native';
import { TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const SignupLogin = () => {
  const [ username, setUsername ] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.header1}>Welcome to 💸🏦💸</Text>
      </View>
      <View style={styles.fieldContainer}>
        <TextInput
          style={styles.field}
          placeholder="Username"
          spellCheck={false}
          autoCorrect={false}
          value={username}
          onChangeText={setUsername}
        >
        </TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => Alert.alert("BOOM")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.button}
          onPress={() => navigation.navigate('Add Categories')}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

export default SignupLogin

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    marginTop: 180

  },
  header1: {
    // textAlignVertical: 'bottom',
    height: 60,
    paddingTop: 19,
    marginBottom: 3,
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: 'pink'
  },
  fieldContainer: {
    // flex: 1,
    backgroundColor: 'lightblue'
  },
  field: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    marginBottom: 3
    
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    backgroundColor: 'honeydew'
  },
  button: {
    width: 100,
    padding: 10,
    borderColor: 'brown',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 5
  },
  buttonText: {
    textAlign: 'center'
  }
})
