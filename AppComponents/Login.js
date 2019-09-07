/**
 * This is a login class used for login into the system.
 * To login user need to enter valid username and password 
 * otherwise it will prompt alert message.
 * 
 */
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    StyleSheet,
    View, 
    Text,
    Image,
    Button,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
	TouchableOpacity,
	AsyncStorage
    } from 'react-native';

export default class Login extends Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: '#00a8ff'},
      };
      constructor(props) {
        super(props);
        this.state ={ username:"", 
            password:"",
        }
    }

    //loginCheck function
        handleSubmit = (event) => {
        event.preventDefault();
		const uname = this.state.username;
        const pwd = this.state.password;

        // check if username or password match. If not, it will prompt alert message with '"Username/Password mismatch".
		if(uname == '' || pwd == ''){
			alert('Username/Password mismatch')
			return;
        }
        // Client Send the request to Server https://weareexpensetracker.herokuapp.com as a JSON object
        fetch('https://weareexpensetracker.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
				user_name: uname,
				user_password : pwd
            })
        })
        .then (async (result) => {
            let resJson = await result.json();
			console.log(resJson);

			if(!resJson.token){
				alert('Username/Password invalid!')
				return;
			}
            // store received token from server in local storage
            await AsyncStorage.setItem('token', resJson.token);
            // store received userID from server in local storage
            await AsyncStorage.setItem('userId', resJson._id);
            this.props.navigation.navigate('BankPage');
        })
        .catch(error => {
            console.log(error);
        });
        // After login it will clear the username and password field
        this.setState({
            username: '',
            password:'',
        })
     
    }

    render () {
        return (
            <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
                
                    <View style = {styles.container}> 
                        <View> 
                            <Image /> 
                        </View>
                        <View >
                        
                            <Text style={styles.heading}> Xpense Tracco</Text>
                            
                        
                            <Text style = {styles.text}> Username</Text>
                            <TextInput style = {styles.input} placeholder = "Username" 
                            onChangeText={text => this.setState({username: text})}
                            value={this.state.username}
                            returnKeyType = "next"
                            onSubmitEditing = {()=> this.passwordInput.focus()}
                            /> 
                        
                            <Text style = {styles.text}t> Password</Text>
                            <TextInput style = {styles.input} placeholder = "Password" 
                            onChangeText={text => this.setState({password: text})}
                            value={this.state.password}
                            secureTextEntry 
                            returnKeyType = "done"
                            ref={(input) => this.passwordInput = input}
        
                            /> 
                            
                            <TouchableOpacity style = {styles.buttonContainer} onPress={this.handleSubmit}> 
                                <View style = {{flexDirection:'row', alignSelf: 'center',}}>
                                    <View style={{marginTop: 5, marginRight: 5}}>
                                    <Icon name="sign-in" size={25} color= "white"/>
                                    </View>
                                    <Button color = 'white' onPress={this.handleSubmit} title="LOGIN"/>
                                </View>
                            </TouchableOpacity>

                            {/* <TouchableOpacity style = {styles.buttonContainer}> 
                            <Button color = 'white' onPress={() => this.props.navigation.navigate('Home')} 
                            title="LOGIN"/>
                            </TouchableOpacity>  */}
                        
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
        //justifyContent: 'center',
        backgroundColor : '#00a8ff',
        padding:15,
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
        marginTop: 120,
        marginBottom: 30,
        color : 'white'
    }
});

