import React, { Component } from 'react'
import { Text, View, StyleSheet, Button, TouchableOpacity, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SettingsScreen extends Component {

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
                <View style = {styles.border}>
                    <Text style = {styles.textStyle}>  <Icon name="user" size={25}/> Profile  </Text>
                </View>

                <View style = {styles.border}>
                    <Text style = {styles.textStyle}> <Icon name="pencil" size={25}/> Edit Personal Details </Text>
                </View>
                
                <View style = {styles.border}>
                    <Text style = {styles.textStyle}> <Icon name="gear" size={25}/> Settings  </Text>
                </View>

                <View style = {styles.border}>
                    <Text style = {styles.textStyle}> <Icon name="question-circle" size={25}/> Help </Text>
                </View>

                
                    <TouchableOpacity style = {styles.buttonContainer} onPress = {()=> {this.removeValue()}}> 
                        <View style = {{flexDirection:'row', alignSelf: 'center'}}>
                            <View style={{marginTop: 5}}>
                                <Icon name="sign-out" size={25} color= "white"/>
                            </View>
                            <Button onPress = {()=> {this.removeValue()}} color = 'white' title="LOGOUT"/>
                        </View>
                    </TouchableOpacity>
                

                {/* <TouchableOpacity style = {styles.buttonContainer} > 
                    <Button onPress={() => this.props.navigation.navigate('Forecast')} color = 'white'  title="Budget Forecast"/>
                </TouchableOpacity> */}
            </View>
        )
    }
}
const styles = StyleSheet.create ( {
    container : {
        flex : 1,
        //justifyContent: 'center',
        backgroundColor : '#afdfed',
        padding:10,
    },
    buttonContainer: {
        backgroundColor: 'green',
        marginTop: 100,
        marginBottom: 20
    },
    border: {
        //backgroundColor: "#54ccb0",
        marginTop:15,
		marginLeft: 5,
		marginRight:5,
		borderBottomWidth:1,
		borderColor: '#585759',
    },
    textStyle:{
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 5,
        marginBottom:15
    }
});

