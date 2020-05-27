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

        if(this.state.Password !== this.state.RetypePassword){
            alert('password does not match');
            return;
        }

        // if(this.state.Password.length >0 && this.state.Password.length < 6){
        //     alert('minimum password length must be 5');
        //     return;
        // }

        let data ={
            "Username": this.state.username,
            "FirstName": this.state.FirstName,
            "LastName": this.state.LastName,
            "Password": this.state.Password,
            "Email": this.state.Email
        };
        console.log(data);
        // Client Send the reequest to Server localhost:3000 as a JSON object
        fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
         // Client get the response from Server, upon successful the user account will be created and navigate back to login page
        .then (async (result) => {
            let responseJson = await result.json();
            //console.log(responseJson);
            
            if(responseJson.error){
                alert('Usename is already taken');
                return;
            }
            if(responseJson.emailError){
                alert('Email already exist');
                return;
            }
            if(responseJson.success){
                this.props.navigation.navigate('LoginPage');
                return;
            }else{
                alert('Register unsuccessfull. Please check your inputs');
                return;
            }
        })
        .catch(error => {
            console.log(error);
        });
      }
      // Status bar title
      static navigationOptions = {
        headerStyle: {backgroundColor: '#00a8ff'},
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
                
                <View style = {styles.container} >
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
                           
                            <TextInput style = {styles.input} placeholder = "Password min. 5 characters" 
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
        padding:15,
    },
    input : {
        height: 40,
        fontSize: 20,
        backgroundColor : 'rgba(255,255,255,0.8)',
        marginBottom: 20,
        padding: 8,
       
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
        marginTop: 35,
        marginBottom: 30,
        color : 'white'
    },
});


