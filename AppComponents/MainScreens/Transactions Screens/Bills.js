/**
 * This is a Bills class that display the merchant name, amount and date of transaction. 
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage} from 'react-native';
import moment from 'moment';


export default class Bills extends Component {
	static navigationOptions = {
		title:'Bills',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
	};
	
	constructor(props) {
		super(props);

		const { navigation } = props;
		let uid = navigation.getParam('user_id');
		let sDate = navigation.getParam('startDate');
		let fDate = navigation.getParam('finishDate');

		this.state = {    
			data: [],
			startDate: sDate,
			FinishDate: fDate,
			myKey: uid
		};
	}
	 
	async componentDidMount (){  
		 
		let jwt_token = "";
		try {
			jwt_token = await AsyncStorage.getItem('token');
		} catch (error) {
			console.log("Error retrieving data" + error);
		} 
		let startDate = encodeURIComponent(this.state.startDate);
		let finishDate = encodeURIComponent(this.state.FinishDate);
		const url = `https://weareexpensetracker.herokuapp.com/api/categories/merchant?category=Bills&sdate=${startDate}&fdate=${finishDate}&uid=${this.state.myKey}`;
		  this.setState({ loading: true });
				
		  fetch(url, {
			headers: {
				'Authorization': 'Bearer '+ jwt_token,
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})      
		      .then(res => res.json())      
		      .then(res => {        
		        this.setState({          
		          data: res,  // database array        
		          error: res.error || null,                 
		        });        
		     })      
		     .catch(error => {        
		       this.setState({ error});      
		     });  
		  };

		  renderItem=({item}) => { 
			return(
				<View>
					<View style={{flex:1}}>
						<Text style={styles.date} >  {moment(item._id.Date).format("DD MMM YY")} </Text>
					</View>
					<View style={{flexDirection:'row', marginBottom: 5}}>
						<Text style={styles.merchant} >  {item._id.Merchant} </Text>
						<Text style={styles.creditAmount} > - £{item.total.toFixed(2)} </Text>
					</View>
				</View>
			)
		}
		 
		render() {
			return (
				<View style={styles.container}>
				
					<Text style={styles.heading}> Transactions </Text>
	
					<FlatList 
						data={this.state.data}   
						renderItem={this.renderItem} 
						keyExtractor={(item,index)=> index.toString()} 
					/>
	
				</View>
			)
		}
	}
	
	const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#afdfed',	
		},
		heading: {
			fontSize: 20,
			marginLeft: 5,
			backgroundColor: '#afdfed',
			padding: 15,
			color: 'black',
			alignSelf: 'center'    
		},
		merchant: {
			flex:1,
			backgroundColor: '#e1e8e5',
			fontSize: 20,
			padding: 5,
			marginLeft: 5,
			height: 50,
			color: 'black',	
		},
		creditAmount: {
			flex:1,
			backgroundColor: '#e1e8e5',
			fontSize: 20,
			padding: 10,
			marginRight: 5,
			height: 50,
			textAlign: 'right',
			color: 'red'
		},
		date : {
			backgroundColor: '#e1e8e5',
			fontSize: 16,
			marginLeft: 5,
			marginRight: 5,
			padding: 5,
			height: 25,
			color: '#324dc7',
		}
	});