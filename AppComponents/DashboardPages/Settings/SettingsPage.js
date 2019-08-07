import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, AsyncStorage } from 'react-native'

export default class SettingsPage extends Component {

   static navigationOptions = {
		title: 'Settings',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
    }
    
    async removeValue() {
        try {
          await AsyncStorage.removeItem('token');
          console.log('Successfully logged out!');
          this.props.navigation.navigate('LoginPage');

        }
        catch(error) {
            console.log('AsyncStorage error: ' + error)
        }
      }
    render() {
        return (
            <View style = {styles.container}>
                <Text> Welcome to Setting Page  </Text>

                <TouchableOpacity style = {styles.buttonContainer} > 
                    <Button onPress = {()=> {this.removeValue()}} color = 'white'  title="LOGOUT"/>
                    </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create ( {
    container : {
        flex : 1,
        justifyContent: 'center',
        backgroundColor : '#00a8ff',
        padding:15,
    },
    buttonContainer: {
    backgroundColor: 'green',
    marginTop: 20,
    marginBottom: 20
    },
});

