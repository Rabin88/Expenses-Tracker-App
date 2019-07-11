import React, { Component } from 'react';

import {
    StyleSheet,
    View, 
    Text,
    Image,
    Button,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    TouchableOpacity 
    } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        title: 'Login',
      };
        state ={ username:"", 
            password:""}

    loginCheck (){
        const { username, password} =this.state
        if(username == 'Username' && password == 'password'){
            this.props.navigation.navigate('bottomHome')
        } else {
            alert('Username/Password mismatch')
            
        }
    }
    render () {
        return (
            <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
                
                    <View style = {styles.container}> 
                        <View> 
                            <Image /> 
                        </View>
                        <View >
                        
                        <Text style={styles.heading}> Expenses Tracker</Text>
                            
                            <Text style = {styles.text}> Username</Text>
                            <TextInput style = {styles.input} placeholder = "Username" 
                            onChangeText={text => this.setState({username: text})}
                            returnKeyType = "next"
                            onSubmitEditing = {()=> this.passwordInput.focus()}
                            /> 
                            <Text style = {styles.text}t> Password</Text>
                            <TextInput style = {styles.input} placeholder = "Password" 
                            onChangeText={text => this.setState({password: text})}
                            secureTextEntry 
                            returnKeyType = "done"
                            ref={(input) => this.passwordInput = input}
        
                            /> 
                            
                            <TouchableOpacity style = {styles.buttonContainer} onPress={this.Login}> 
                            <Button color = 'white' onPress={() => this.loginCheck()} 
                            title="LOGIN"/>
                            </TouchableOpacity>
                        
                        <Button onPress={() => this.props.navigation.navigate('SignupPage')} 
                        color = 'white'
                        title="Create Account Now?"/>
                        </View>
                    </View>
               
            </KeyboardAvoidingView>
    
        );
    }
}

const styles = StyleSheet.create ( {
    container : {
        flex : 1,
        justifyContent: 'center',
        backgroundColor : '#00a8ff',
        padding:20
    },
    input : {
        height: 40,
        fontSize: 20,
        backgroundColor : 'rgba(255,255,255,0.8)',
        marginBottom: 10,
        padding: 10
    },
    buttonContainer: {
        backgroundColor: 'green',
        marginTop: 20,
        marginBottom: 20

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
    }
});

