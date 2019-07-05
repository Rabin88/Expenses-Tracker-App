import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, KeyboardAvoidingView,
        Image, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native'

export default class Signup extends Component {
    static navigationOptions = {
        title: 'Sign Up',
      };
    render() {
        return (
            <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
                
                <View style = {styles.formContainer} >
                    <StatusBar barStyle = 'default'/>
                    
                    <ScrollView>
                        <Text style={styles.heading}> Sign Up</Text>
                            
                            <TextInput style = {styles.input} placeholder = "Username" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "next"
                            onSubmitEditing = {()=> this.firstNameInput.focus()}
                            /> 

                            <TextInput style = {styles.input} placeholder = "First Name" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "next"
                            ref={(input) => this.firstNameInput = input}
                            onSubmitEditing = {()=> this.lastNameInput.focus()}
                            /> 

                            <TextInput style = {styles.input} placeholder = "Last Name" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "next"
                            ref={(input) => this.lastNameInput = input}
                            onSubmitEditing = {()=> this.passwordInput.focus()}
                            />

                            <TextInput style = {styles.input} placeholder = "Password" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "next"
                            ref={(input) => this.passwordInput = input}
                            onSubmitEditing = {()=> this.repasswordInput.focus()}
                            />

                            
                            <TextInput style = {styles.input} placeholder = "Re-type Password" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "next"
                            ref={(input) => this.repasswordInput = input}
                            onSubmitEditing = {()=> this.emailInput.focus()}
                            />

                            
                            <TextInput style = {styles.input} placeholder = "Email" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "done"
                            ref={(input) => this.emailInput = input}
                            /> 

                            <TouchableOpacity style = {styles.buttonContainer} onPress={this.Login}> 
                            <Button color = 'white' title="SUBMIT"/>
                            </TouchableOpacity>  

                            <Button onPress={() => this.props.navigation.navigate('LoginPage')} 
                            color ='white'
                            title="Already Registered? Login"/>
                            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginPage')}>
                            <Text> Already Registered? Login </Text>
                            </TouchableOpacity> */}
                            
                    </ScrollView>         
                </View>
              </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create ( {
    container : {
        flex : 1,
        justifyContent: 'center',
        backgroundColor : '#00a8ff',
        padding:30,
    },
    input : {
        height: 40,
        fontSize: 20,
        backgroundColor : 'rgba(255,255,255,0.8)',
        marginBottom: 20,
        padding: 10,
       
    },
    buttonContainer: {
        backgroundColor: 'green',

    },
    text: {
        fontWeight: '400',
        fontSize: 20,
        marginBottom: 10
    },
    account: {
        color : 'white',
        textAlign: 'center',
        padding: 20,
        fontWeight: '400',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    heading:{
        fontWeight: '800',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30,
        color : 'white'
    },
});


