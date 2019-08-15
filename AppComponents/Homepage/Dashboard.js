import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity, AsyncStorage} from 'react-native';
import moment from 'moment';

export default class Dashboard extends Component {
	static navigationOptions = {
		title:'Dashboard',
		headerStyle: {backgroundColor: '#179bbd'},
		headerTitleStyle: {color:'white'}
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
		  this.getData();
		  this.getExpensesData();
		} catch (error) {
		  //console.log("Error retrieving data" + error);
		  "Error retrieving data" + error;
		}
	  }

		 getData(){  
		 let user_id = this.state.myKey;
			  
		 fetch(`http://localhost:3000/api/totalbalance?user_id=${user_id}`, {
			method: 'GET',
			headers: {
				 'Authorization': 'Bearer '+ this.state.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
			})
			.then(async(result) => {
			let resJson = await result.json();
			//console.log(resJson);
			
			this.setState({          
				totalBalance: resJson[0],  // database array       
				//error: resJson.error || null,                 
			  });        
		   })      
		   .catch(error => {        
			 this.setState({ error});      
		   }); 
		}

		//   const url = `http://localhost:3000/api/balance`;
				
		//     fetch(url, {
		// 		method: 'GET',
		// 		headers: {
		// 			 //'Authorization': 'Bearer '+ this.state.token,
		// 			'Accept': 'application/json',
		// 			'Content-Type': 'application/json',
		// 		},
		// 		})     
		//       .then(res => res.json())      
		//       .then(res => {        
		//         this.setState({          
		//           data: res,  // database array        
		//           error: res.error || null,          
		//           loading: false,        
		//         });        
		//      })      
		//      .catch(error => {        
		//        this.setState({ error, loading: false });      
		//      });  
		//   };
		
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
				//console.log(resJson);
				
				this.setState({          
					data: result  // database array                        
				  });        
			   }) 
			// 	.then(res => res.json())      
		    //   	.then(res => {        
		    //     this.setState({          
		    //       data: res,  // database array                
		    //     });        
		    //  })      
		     .catch(error => {        
		       this.setState({ error});      
		     }) 
		}
	// renderBalance = ({item}) => {
	// 	return (
	// 		<Text style={styles.balance}> Balance  £{item.balance} </Text>
	// 	)
	// }

	renderItem=({item}) => { 
		return(
			<View>
				<View style={{flexDirection:'row', marginBottom: 5}}>
					<Text style={styles.welcome} > Expense </Text>
					<Text style={styles.expense} > - £{item.Expense.toFixed(2)} </Text>
				</View>
					<View style={{flexDirection:'row', marginBottom: 5}}>
					<Text style={styles.welcome} > Income </Text>
					<Text style={styles.income} > + £{item.Income.toFixed(2)} </Text>
				</View>

			</View>
			)
	}
	renderSeparator = () => {
		return (
			<View style = {{ width: '100%', borderWidth:0.2}}>

			</View>
		)
	}
	 
	render() {
		let currentbalance = parseFloat(this.state.totalBalance.balance)
		return (
			<View style={styles.container}>
				<View>
				<Image  style = {{ width: 200, height: 200, alignSelf: 'center', marginTop: 30, marginBottom:10, }}
					source={require('/Users/rabinpun/Desktop/ReactNative/Finance/assets/logo.png')}
					/>
				
				<View >
				<Text style={styles.balance}> Balance   £{currentbalance.toFixed(2)} </Text>
				<Text style={styles.budgetDetails}>  {moment(this.sDate).format("MMMM")} Budget Details </Text>
				{/* <Text style={styles.balance}> Balance   £{ this.renderBalance()} </Text> */}
				</View>
				<FlatList 
					data={this.state.data}   
					renderItem={this.renderItem} 
					keyExtractor={(item,index)=> index.toString()} 
					ItemSeparatorComponent ={this.renderSeparator}
				/>

				<TouchableOpacity style = {styles.button} > 
				<Button onPress={() => this.props.navigation.navigate('CategoriesPage')} color = 'white' title="View Transactions"/>
				</TouchableOpacity> 
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		//justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: '#afdfed',	
	},
	balance: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 30,
		marginBottom:20,
		color: '#09872d'
	},
	welcome: {
		flex:1,
		fontSize: 20,
		marginLeft: 5,
		//backgroundColor: '#c8d0db',
		backgroundColor: '#e1e8e5',
		padding: 15,
		height: 60,
		color: 'black',
	},
	income: {
		flex:1,
		fontSize: 20,
		marginRight: 5,
		textAlign: 'right',
		backgroundColor: '#e1e8e5',
		padding: 15,
		height: 60,
		color: 'green'
	},
	expense: {
		flex:1,
		fontSize: 20,
		marginRight: 5,
		textAlign: 'right',
		backgroundColor: '#e1e8e5',
		padding: 15,
		height: 60,
		color: 'red'
	},
	button:{
		width: 200,
		marginTop:40,
		backgroundColor:'#179bbd',
		borderRadius:40,
		borderWidth: 1,
		borderColor: '#fff',
		alignSelf: 'center',
	},
	budgetDetails: {
		fontSize: 20,
		//fontWeight: 'bold',
		textAlign: 'center',
		marginBottom:15,
		color: '#585759'
	}
	
});
