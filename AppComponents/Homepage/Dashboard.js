import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList, TouchableOpacity} from 'react-native';


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
			totalBalance:0,      
			error: null, 
		};
	}
	 componentDidMount (){  
		 const balance = this.state.totalBalance
			  
		 fetch('http://localhost:3000/api/totalbalance', {
			method: 'GET',
			headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
			})
			.then(async(result) => {
			let resJson = await result.json();
			console.log(resJson);
			
			this.setState({          
				totalBalance: resJson[0],  // database array       
				//error: resJson.error || null,                 
			  });        
		   })      
		   .catch(error => {        
			 this.setState({ error});      
		   }); 

		  const url = `http://localhost:3000/api/balance`;
		  this.setState({ loading: true });
				
		    fetch(url)      
		      .then(res => res.json())      
		      .then(res => {        
		        this.setState({          
		          data: res,  // database array        
		          error: res.error || null,          
		          loading: false,        
		        });        
		     })      
		     .catch(error => {        
		       this.setState({ error, loading: false });      
		     });  
		  };

		  //Test data
	// 	this.setState({ 
	// 		data:[
	// 			{key: "Expense",  total:500},
	// 			{key: "Income", total:1500},
	// 		]
	// 	})

	// }
	renderBalance = ({item}) => {
		return (
			<Text style={styles.balance}> Balance  £{item.balance.toLocaleString(undefined, {maximumFractionDigits:2})} </Text>
		)
	}

	renderItem=({item}) => { 
		return(
			<View>
				<View style={{flexDirection:'row', marginBottom: 5}}>
					<Text style={styles.welcome} > Expense </Text>
					<Text style={styles.expense} > - £{item.Expense.toLocaleString(undefined, {maximumFractionDigits:2})} </Text>
				</View>
					<View style={{flexDirection:'row', marginBottom: 5}}>
					<Text style={styles.welcome} > Income </Text>
					<Text style={styles.income} > + £{item.Income.toLocaleString(undefined, {maximumFractionDigits:2})} </Text>
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
		return (
			<View style={styles.container}>
				<View>
				<Image  style = {{ width: 200, height: 200, alignSelf: 'center', marginTop: 30, marginBottom:10, }}
					source={require('/Users/rabinpun/Desktop/ReactNative/Finance/assets/logo.png')}
					/>
				
				<View >
				<Text style={styles.balance}> Balance   £{ this.state.totalBalance.balance} </Text>
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
		marginBottom:30,
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
	
});
