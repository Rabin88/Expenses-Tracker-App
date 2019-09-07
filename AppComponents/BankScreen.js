/**
 * This is Bank Screen that is used to get customer transaction data from database and navigate to Dashboard screen.
 * User transaction data are manually entered in the database. Therefore, if the new user does not have any data
 * in the database, it will prompt alert message and will not naviagte to Dashboard page.
 */
import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet, Image, AsyncStorage, Linking} from 'react-native'
import moment from 'moment'; // component that format date 

export default class BankScreen extends Component {
    static navigationOptions = {
        headerStyle: {backgroundColor: '#00a8ff'},
    };

    constructor(props) {
		super(props);
		this.state = {    
			data: [],
			totalBalance:'',      
			error: null,
			myKey: '',
			token: '', 
		};
		this.getStorageData();
    }
    // Function to get stored token and userId
    async getStorageData() {
		try {
		  const user_id = await AsyncStorage.getItem('userId');
		  const jwt_token = await AsyncStorage.getItem('token');
			
		  this.setState({myKey: user_id, token: jwt_token})
		  this.getExpensesData();
		} catch (error) {
		  //console.log("Error retrieving data" + error);
		  "Error retrieving data" + error;
		}
    }
    // To check if the user have tranascation data in the database.
    navigateToHome(){
        if(this.state.data.length > 0 && this.state.data.count_transaction != 0){
            this.props.navigation.navigate('Home')
        }else{
            alert('Connection to your bank cannot be established at this point.');
        }
        
    }

    // Function to  fetch expenses data from database
    getExpensesData (){  
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var year = dateObj.getUTCFullYear();

        var monthStr = month;
        if(month < 10){
            monthStr = "0"+month;
        }
        var thisMonthFirstDay = `${year}-${monthStr}-01T00:00:00.000+00:00`;

        const sDate = thisMonthFirstDay;
        const fDate = moment(dateObj, "DD-MM-YYYY", true).format();
        //console.log(sDate, fDate);


        fetch('https://weareexpensetracker.herokuapp.com/api/expenses', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+ this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                start_date: sDate,
                finish_date :fDate,
                userid: this.state.myKey
            })
        })
        .then(async(res) => {
            let result = await res.json();
            console.log(result);
            
            this.setState({          
                data: result  // database array                        
              });        
           }) 
    
         .catch(error => {        
           this.setState({ error});      
         }) 
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Image  style = {{ width: 200, height: 200, alignSelf: 'center', marginTop: 50, marginBottom:25, }}
					source={require('/Users/rabinpun/Desktop/ReactNative/Finance/assets/bank-icon-png-10.jpg')}
					/>
        
                <TouchableOpacity style = {styles.buttonContainer}> 
                    <Button color = 'white' onPress={() => this.navigateToHome()} 
                    title = "Get Transaction Data"/>
                </TouchableOpacity>

                <Text style={styles.url}> For more information about Open Banking, Visit </Text>
                <Text style={{color: '#a836d1', textAlign: 'center', fontSize: 18,textDecorationLine: 'underline'}}
                onPress={() => Linking.openURL('https://www.openbanking.org.uk')}> www.openbanking.org.uk </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create ( {
    container : {
        flex : 1,
        //justifyContent: 'center',
        backgroundColor : '#00a8ff',
        padding:15,
    },
    buttonContainer: {
        backgroundColor: 'green',
        marginTop: 10,
        marginBottom: 30

    },
    text: {
        color:'white',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    url: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'center'  
    }

});