import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet, Image, AsyncStorage, Alert} from 'react-native'
import moment from 'moment';

export default class Bank extends Component {
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

    navigateToHome(){
        // if(this.state.data.length > 0 && this.state.data.count_transaction != 0){
        //     this.props.navigation.navigate('Home')
        if(this.state.data.count_transaction != 0){
            this.props.navigation.navigate('Home')
        }else{
            alert('Connection to your bank cannot be established at this point.');
        }
        
    }


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


        fetch('http://localhost:3000/api/expenses', {
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
                <Image  style = {{ width: 200, height: 200, alignSelf: 'center', marginTop: 50, marginBottom:10, }}
					source={require('/Users/rabinpun/Desktop/FinanceFinal/assets/bank-icon-png-10.jpg')}
					/>
                <Text style={styles.text}> Select Bank </Text>
                <Text style={styles.bankList}> Lloyds </Text>
                <Text style={styles.bankList}> HSBC </Text>
                <Text style={styles.bankList}> Halifax </Text>
                <Text style={styles.bankList}> Barclays </Text>
                <TouchableOpacity style = {styles.buttonContainer}> 
                    <Button color = 'white' onPress={() => this.navigateToHome()} 
                    title = "Connect to Bank"/>
                </TouchableOpacity>
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
        marginBottom: 20

    },
    text: {
        color:'white',
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    bankList: {
        fontSize: 15,
        marginBottom: 5,
        textAlign: 'center'  
    }

});