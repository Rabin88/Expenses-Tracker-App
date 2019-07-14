import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, KeyboardAvoidingView,
        Image, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native'


export default class Signup extends Component {
      constructor(props) {
        super(props);
        this.state ={ username:"", 
            FirstName:"",
            LastName:"",
            Password:"",
            RetypePassword:"",
            Email:""
        }
      }
      handleSubmit = (event) => {
        event.preventDefault();
        console.log('handle sign up submit');

    
        if(this.state.Password.length < 7){
            alert('minimum password length must be 7');
            return;
        }
        if(this.state.Password !== this.state.RetypePassword){
            alert('password does not match');
            return;
        }

        let data ={
            "Username": this.state.username,
            "FirstName": this.state.FirstName,
            "LastName": this.state.LastName,
            "Password": this.state.Password,
            "Email": this.state.Email
        };
        console.log(data);
        
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then (async (result) => {
            let responseJson = await result.json();
			console.log(responseJson);

            if(responseJson.success){
                this.props.navigation.navigate('LoginPage');
            }else{
                alert('Register unsuccessfull. Please check your inputs');
            }
			
        })
        .catch(error => {
            console.log(error);
        });
      }
      static navigationOptions = {
        title: 'Sign Up',
      };
      
      validation (text, type){
        //let textValue = text.target.username;
        switch (type){
            case "username" : {
                    this.setState({username: text})
            }
            case "FirstName" : {
                this.setState({FirstName: text})
            }
            case "LastName" : {
                this.setState({LastName: text})
            }
            case "Password" : {
                this.setState({Password: text})
            }
            case "RetypePassword" : {
                this.setState({RetypePassword: text})
            }
            case "Email" : {
                this.setState({Email: text})
            }
        }
      }
    
    render() {
        return (
           
            <KeyboardAvoidingView behavior = "padding" style = {styles.container}>
                
                <View style = {styles.formContainer} >
                    <StatusBar barStyle = 'default'/>
                    
                    <ScrollView>
                        <Text style={styles.heading}> Sign Up</Text>
                            
                            <TextInput style = {styles.input} placeholder = "Username" 
                            onChangeText={(text) => this.validation(text, 'username') }
                            returnKeyType = "next"
                            onSubmitEditing = {()=> this.firstNameInput.focus()}
                            /> 

                            <TextInput style = {styles.input} placeholder = "First Name" 
                            onChangeText={(text) => this.validation(text, 'FirstName')}
                            returnKeyType = "next"
                            ref={(input) => this.firstNameInput = input}
                            onSubmitEditing = {()=> this.lastNameInput.focus()}
                            /> 

                            <TextInput style = {styles.input} placeholder = "Last Name" 
                            onChangeText={(text) => this.validation(text, 'LastName')}
                            returnKeyType = "next"
                            ref={(input) => this.lastNameInput = input}
                            onSubmitEditing = {()=> this.passwordInput.focus()}
                            />

                            <TextInput style = {styles.input} placeholder = "Password min. 7 characters" 
                            onChangeText={(text) => this.validation(text, 'Password')}
                            secureTextEntry 
                            returnKeyType = "next"
                            ref={(input) => this.passwordInput = input}
                            onSubmitEditing = {()=> this.repasswordInput.focus()}
                            />

                            
                            <TextInput style = {styles.input} placeholder = "Re-type Password" 
                            onChangeText={(text) => this.validation(text, 'RetypePassword')}
                            secureTextEntry 
                            returnKeyType = "next"
                            ref={(input) => this.repasswordInput = input}
                            onSubmitEditing = {()=> this.emailInput.focus()}
                            />

                            
                            <TextInput style = {styles.input} placeholder = "Email" 
                            onChangeText={(text) => this.validation(text, 'Email')}
                            returnKeyType = "done"
                            ref={(input) => this.emailInput = input}
                            /> 

                            <TouchableOpacity style = {styles.buttonContainer} onPress={this.handleSubmit}> 
                            <Button onPress={this.handleSubmit} color = 'white' title="SUBMIT"/>
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


